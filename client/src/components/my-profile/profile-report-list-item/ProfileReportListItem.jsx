import { Link } from 'react-router-dom';

export default function ProfileReportListItem({
    _id,
    title,
    location,
    topic,
    collection
}) {
    return (
        <div className="col-lg-4 col-md-6">
            <div className="team-item position-relative">
                <div className="position-relative overflow-hidden rounded">
                    <img className="img-fluid w-100" src={`/${topic}`} alt="" />
                    <div className="team-overlay">
                        <div className="d-flex align-items-center justify-content-start">
                            <Link className="btn btn-light mx-1" to={`/${collection}/${_id}/details`}>Details</Link>
                        </div>
                    </div>
                </div>
                <div className="position-absolute start-0 bottom-0 w-100 rounded-bottom text-center p-4" style={{ background: "rgba(34, 36, 41, .9)" }}>
                    <h5 className="text-uppercase text-light">{title}</h5>
                    <p className="text-uppercase text-secondary m-0">{location}</p>
                </div>
            </div>
        </div>
    );
}