import { useParams } from "react-router-dom";
import { useGetOneArchive } from "../../hooks/useArchived.js";
import { formatDate } from "../../utils/dateUtils.js";
import Spinner from "../spinner/Spinner.jsx";

export default function ArchiveDetails() {
    const { archiveId } = useParams();
    const { archive, isLoading } = useGetOneArchive(archiveId);

    const likes = archive.likes?.length || 0;
    const comments = archive.comments || [];

    return (
        <>
            {isLoading
                ? <Spinner />
                : (
                    <>
                        <div className="container-fluid p-0" style={{ margin: "50px 0" }}>
                            <div className="row g-0 mx-5">
                                <div className="col-lg-3" style={{ minHeight: "500px" }}>
                                    <div className="position-relative h-100">
                                        <img className="position-absolute w-100 h-100" src={`/${archive.topic}`} style={{ objectFit: "cover" }} />
                                    </div>
                                </div>
                                <div className="col-lg-9 p-5 bg-dark">
                                    <div className="mb-5">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h5 className="text-primary text-uppercase">{archive.author}</h5>
                                            <h5 className="text-danger text-uppercase fs-2">ARCHIVED</h5>
                                        </div>
                                        <h3 className="text-primary text-uppercase text-end"><i className="fa fa-heart"></i> {likes}</h3>
                                        <h1 className="display-3 text-uppercase text-light mb-0">{archive.title}</h1>
                                    </div>
                                    <div>
                                        <div className="testimonial-item">
                                            <p className="fs-4 fw-normal text-light mb-4" style={{ textAlign: "justify" }}><i className="fa fa-quote-left text-primary me-3"></i>{archive.description}</p>
                                            <div className="d-flex align-items-center">
                                                <div className="ps-0">
                                                    <h5 className="text-uppercase text-light">{`Location: ${archive.location}`}</h5>
                                                    <span className="text-uppercase text-secondary">{formatDate(archive._createdOn)}</span>
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
                                            <div className="col-lg-3 bg-dark rounded" style={{ textAlign: 'center' }}><h6 className="text-primary mt-1">{comment.author.username}{archive._ownerId == comment._ownerId ? <span className="text-white"> (author)</span> : ""}</h6></div>
                                            <div className="col-lg-3"></div>
                                        </div>
                                        <p style={{ textAlign: 'center', color: "black", marginBottom: '0', marginTop: '10px' }}>{comment.comment}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* <!-- Comment List End --> */}
                    </>
                )
            }
        </>
    );
}