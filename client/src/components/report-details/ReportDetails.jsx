import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import reportsAPI from "../../api/reports-api.js";

export default function ReportDetails() {
    const [report, setReport] = useState({});
    const { reportId } = useParams();

    useEffect(() => {
        (async () => {
            const result = await reportsAPI.getOne(reportId);

            setReport(result);
        })();
    }, []);

    return (
        <div className="container-fluid p-0" style={{ margin: "90px 0" }}>
            <div className="row g-0">
                <div className="col-lg-3" style={{ minHeight: "500px" }}>
                    <div className="position-relative h-100">
                        <img className="position-absolute w-100 h-100" src={report.imageUrl} style={{ objectFit: "cover" }} />
                    </div>
                </div>
                <div className="col-lg-9 bg-dark p-5">
                    <div className="mb-5">
                        <h5 className="text-primary text-uppercase">{report.author}</h5>
                        <h3 className="text-primary text-uppercase text-end"><i class="fa fa-heart"></i> 0</h3>
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
                            <div class="nav nav-pills justify-content-between mt-5 mb-3">
                                <div class="col-lg-3">
                                    <Link class="nav-link text-uppercase text-center w-100 active" to="#pills-1">Edit</Link>
                                </div>
                                <div class="col-lg-3">
                                    <Link class="nav-link text-uppercase text-center w-100 active" to="#pills-2">Archive</Link>
                                </div>
                                <div class="col-lg-3">
                                    <Link class="nav-link text-uppercase text-center w-100 active" to="#pills-3">Delete</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}