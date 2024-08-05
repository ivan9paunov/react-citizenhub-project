import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext.jsx";
import { useForm } from "../../hooks/useForm.js";
import { useGetOneReport } from "../../hooks/useReports.js";
import { useCreateComment, useGetAllComments } from "../../hooks/useComments.js";
import { useGetAllLikes } from "../../hooks/useLikes.js";
import { formatDate } from "../../utils/dateUtils.js";
import reportsAPI from "../../api/reports-api.js";
import archivedAPI from "../../api/archived-api.js";
import commentsAPI from "../../api/comments-api.js";
import Like from "../likes/like/Like.jsx";
import Dislike from "../likes/dislike/Dislike.jsx";
import CustomModal from "../customModal/CustomModal.jsx";

const initialValues = {
    comment: ''
};

export default function ReportDetails() {
    const { reportId } = useParams();
    const [report] = useGetOneReport(reportId);
    const [comments, dispatchComments] = useGetAllComments(reportId);
    const [commentError, setCommentError] = useState('');
    const [likes, dispatchLikes] = useGetAllLikes(reportId);
    const [modalState, setModalState] = useState({ show: false, action: '' });
    const { isAuthenticated, userId, username } = useAuthContext();
    const createComment = useCreateComment();
    const navigate = useNavigate();


    const { values, changeHandler, submitHandler } = useForm(initialValues, async ({ comment }) => {
        if (!comment) {
            setCommentError('Please type your comment');
            throw new Error('Please type your comment');
        }

        try {
            const newComment = await createComment(reportId, comment);
            setCommentError('');
            dispatchComments({ type: 'ADD_COMMENT', payload: { ...newComment, author: { username } } });
        } catch (err) {
            throw new Error(err.message);
        }
    });

    const showModalClickHandler = (action) => setModalState({ show: true, action });

    const closeModalClickHandler = () => setModalState({ show: false, action: '' });

    const reportArchiveHandler = async () => {
        try {
            await archivedAPI.create({ ...report, comments: comments, likes: likes });
            await reportsAPI.remove(reportId);
            setModalState({ show: false, action: '' });
            navigate('/archived');
        } catch (err) {
            throw new Error(err.message);
        }
    };

    const reportDeleteHandler = async () => {
        try {
            await reportsAPI.remove(reportId);
            setModalState({ show: false, action: '' });
            navigate('/reports');
        } catch (err) {
            throw new Error(err.message);
        }
    };

    const commentDeleteHandler = async (e) => {
        const commentId = e.target.dataset.id;
        try {
            await commentsAPI.remove(commentId);

            dispatchComments({ type: 'DELETE_COMMENT', payload: commentId });
        } catch (err) {
            throw new Error(err.message);
        }
    };

    const likeHandler = (newLike) => {
        dispatchLikes({ type: 'LIKE', payload: newLike });
    };

    const likeId = likes.find((like) => like._ownerId == userId)?._id;
    const dislikeHandler = (likeId) => {
        dispatchLikes({ type: 'DISLIKE', payload: likeId });
    };

    const isOwner = userId == report._ownerId;
    const hasLiked = !!likes.find((l) => l._ownerId == userId);

    return (
        <>
            <div className="container-fluid p-0" style={{ margin: "50px 0" }}>
                <div className="row g-0 mx-5">
                    <div className="col-lg-3" style={{ minHeight: "500px" }}>
                        <div className="position-relative h-100">
                            <img className="position-absolute w-100 h-100" src={`/${report.topic}`} style={{ objectFit: "cover" }} />
                        </div>
                    </div>
                    <div className="col-lg-9 bg-dark p-5">
                        <div className="mb-5">
                            <h5 className="text-primary text-uppercase">{report.author}</h5>
                            <h3 className="text-primary text-uppercase text-end"><i className="fa fa-heart"></i> {likes.length}</h3>
                            <h1 className="display-3 text-uppercase text-light mb-0">{report.title}</h1>
                        </div>
                        <div>
                            <div className="testimonial-item">
                                <p className="fs-4 fw-normal text-light mb-4" style={{ textAlign: "justify" }}><i className="fa fa-quote-left text-primary me-3"></i>{report.description}</p>
                                <div className="d-flex align-items-center">
                                    <div className="ps-0">
                                        <h5 className="text-uppercase text-light">{`Location: ${report.location}`}</h5>
                                        <span className="text-uppercase text-secondary">{formatDate(report._createdOn)}</span>
                                    </div>
                                </div>
                                {isAuthenticated && <>
                                    {isOwner
                                        ? (
                                            <div className="nav nav-pills justify-content-between mt-5 mb-3">
                                                <div className="col-lg-3">
                                                    <Link to={`/reports/${reportId}/edit`} className="nav-link text-uppercase text-center w-100 active">Edit</Link>
                                                </div>
                                                <div className="col-lg-3">
                                                    <Link onClick={() => showModalClickHandler('archive')} className="nav-link text-uppercase text-center w-100 active">Archive</Link>
                                                </div>
                                                <div className="col-lg-3">
                                                    <Link onClick={() => showModalClickHandler('delete')} className="nav-link text-uppercase text-center w-100 active">Delete</Link>
                                                </div>
                                                {modalState.show && (
                                                    <CustomModal
                                                        action={modalState.action}
                                                        onConfirm={modalState.action == 'archive'
                                                            ? reportArchiveHandler
                                                            : reportDeleteHandler}
                                                        onClose={closeModalClickHandler}
                                                    />
                                                )};
                                            </div>
                                        )
                                        : (
                                            <div className="nav nav-pills mt-5 mb-3">
                                                <div className="col-lg-1">
                                                    {hasLiked
                                                        ? <Dislike likeId={likeId} onDislike={dislikeHandler} />
                                                        : <Like reportId={reportId} onLike={likeHandler} />
                                                    }
                                                </div>
                                            </div>
                                        )
                                    }
                                </>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* // <!-- Comment List Start --> */}
            <div className="col-lg-6 mx-auto mb-5">
                <h3 className="text-uppercase mb-4 text-center">
                    {comments.length > 0
                        ? comments.length == 1
                            ? "1 COMMENT"
                            : `${comments.length} COMMENTS`
                        : `0 COMMENTS`}
                </h3>
                {comments.map(comment => (
                    <div key={comment._id} className="bg-secondary d-flex mb-4 rounded">
                        <div className="container p-3">
                            <div className="row d-flex justify-content-between">
                                <div className="col-lg-3"><h6><small><i>{formatDate(comment._createdOn)}</i></small></h6></div>
                                <div className="col-lg-3 bg-dark rounded" style={{ textAlign: 'center' }}><h6 className="text-primary mt-1">{comment.author.username}{report._ownerId == comment._ownerId ? <span className="text-white"> (author)</span> : ""}</h6></div>
                                {userId == comment._ownerId
                                    ? <div className="col-lg-3" style={{ textAlign: "end" }}><button onClick={commentDeleteHandler} data-id={comment._id} className="btn btn-sm btn-primary">x</button></div>
                                    : <div className="col-lg-3"></div>
                                }
                            </div>
                            <p style={{ textAlign: 'center', color: "black", marginBottom: '0', marginTop: '10px' }}>{comment.comment}</p>
                        </div>
                    </div>
                ))}
            </div>
            {/* <!-- Comment List End --> */}

            {/* <!-- Comment Form Start --> */}
            {isAuthenticated && (
                <div className="col-lg-6 mx-auto mb-5 bg-dark rounded p-5">
                    <h3 className="text-light text-uppercase mb-4">Leave a comment</h3>
                    <form onSubmit={submitHandler}>
                        <div className="row g-3">
                            <div className="col-12">
                                <textarea
                                    name="comment"
                                    value={values.comment}
                                    onChange={changeHandler}
                                    className={`form-control bg-white ${commentError ? 'border-danger-thick' : 'border-0'}`}
                                    rows="5"
                                    placeholder="Comment"
                                ></textarea>
                            </div>
                            <div className="col-12">
                                <button className="btn btn-primary w-100 py-3" type="submit">Leave Your Comment</button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
            {/* <!-- Comment Form End --> */}
        </>
    );
}