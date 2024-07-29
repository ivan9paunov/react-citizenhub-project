import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import commentsApi from "../../api/comments-api.js";
import { useGetOneReport } from "../../hooks/useReports.js";

export default function ReportDetails() {
    const { reportId } = useParams();
    const [report, setReport] = useGetOneReport(reportId);
    const [comment, setComment] = useState('');

    const commentSubmitHandler = async (e) => {
        e.preventDefault();

        const newComment = await commentsApi.create(reportId, comment);

        setReport(prevState => ({
            ...prevState,
            comments: {
                ...prevState.comments,
                [newComment._id]: newComment
            }
        }));

        setComment('');
    };

    return (
        <>
            <div className="container-fluid p-0" style={{ margin: "90px 0" }}>
                <div className="row g-0">
                    <div className="col-lg-3" style={{ minHeight: "500px" }}>
                        <div className="position-relative h-100">
                            <img className="position-absolute w-100 h-100" src={`/${report.topic}`} style={{ objectFit: "cover" }} />
                        </div>
                    </div>
                    <div className="col-lg-9 bg-dark p-5">
                        <div className="mb-5">
                            <h5 className="text-primary text-uppercase">{report.author}</h5>
                            <h3 className="text-primary text-uppercase text-end"><i className="fa fa-heart"></i> 0</h3>
                            <h1 className="display-3 text-uppercase text-light mb-0">{report.title}</h1>
                        </div>
                        <div>
                            <div className="testimonial-item">
                                <p className="fs-4 fw-normal text-light mb-4"><i className="fa fa-quote-left text-primary me-3"></i>{report.description}</p>
                                <div className="d-flex align-items-center">
                                    <div className="ps-0">
                                        <h5 className="text-uppercase text-light">{`Location: ${report.location}`}</h5>
                                        <span className="text-uppercase text-secondary">{report.createdAt}</span>
                                    </div>
                                </div>
                                <div className="nav nav-pills justify-content-between mt-5 mb-3">
                                    <div className="col-lg-3">
                                        <Link className="nav-link text-uppercase text-center w-100 active" to="#pills-1">Edit</Link>
                                    </div>
                                    <div className="col-lg-3">
                                        <Link className="nav-link text-uppercase text-center w-100 active" to="#pills-2">Archive</Link>
                                    </div>
                                    <div className="col-lg-3">
                                        <Link className="nav-link text-uppercase text-center w-100 active" to="#pills-3">Delete</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* // <!-- Comment List Start --> */}
            <div className="col-lg-6 mx-auto mb-5">
                <h3 className="text-uppercase mb-4 text-center">
                    {report.comments
                        ? Object.values(report.comments).length == 1
                            ? `${Object.values(report.comments).length} COMMENT`
                            : `${Object.values(report.comments).length} COMMENTS`
                        : `0 COMMENTS`}
                </h3>
                {report.comments && Object.values(report.comments).map(comment => (
                    <div key={comment._id} className="d-flex mb-4">
                        <div>
                            <h6><a href="">John Doe</a> <small><i>01 Jan 2045</i></small></h6>
                            <p>{comment.comment}</p>
                            <button className="btn btn-sm btn-secondary">Reply</button>
                        </div>
                    </div>
                ))}
            </div>
            {/* <!-- Comment List End --> */}

            {/* <!-- Comment Form Start --> */}
            <div className="col-lg-6 mx-auto mb-5 bg-dark rounded p-5">
                <h3 className="text-light text-uppercase mb-4">Leave a comment</h3>
                <form onSubmit={commentSubmitHandler}>
                    <div className="row g-3">
                        <div className="col-12">
                            <textarea
                                className="form-control bg-white border-0"
                                rows="5"
                                placeholder="Comment"
                                onChange={(e) => setComment(e.target.value)}
                                value={comment}
                            ></textarea>
                        </div>
                        <div className="col-12">
                            <button className="btn btn-primary w-100 py-3" type="submit">Leave Your Comment</button>
                        </div>
                    </div>
                </form>
            </div>
            {/* <!-- Comment Form End --> */}
        </>
    );
}