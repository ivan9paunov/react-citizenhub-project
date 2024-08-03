import { useNavigate, useParams } from "react-router-dom";

import { useForm } from "../../hooks/useForm.js";
import { useGetOneReport } from "../../hooks/useReports.js";
import reportsAPI from "../../api/reports-api.js";

export default function ReportEdit() {
    const navigate = useNavigate();
    const { reportId } = useParams();
    const [report] = useGetOneReport(reportId);

    const {
        values,
        changeHandler,
        submitHandler
    } = useForm(report, async (values) => {
        await reportsAPI.update(reportId, values);

        navigate(`/reports/${reportId}/details`);
    }, true);

    return (
        <div className="py-5">
            <div className="row bg-dark">
                <div className="col-md-6 my-auto">
                    <img src={`/${values.topic}`} alt="" style={{ float: "right" }} />
                </div>
                <div className="col-md-6 p-5 my-200px" style={{ width: "500px" }}>
                    <h3 className="text-light text-uppercase mb-4 text-center">Edit Report</h3>
                    <h5 className="text-primary text-uppercase mb-4 text-center">Please provide detailed information</h5>
                    <form onSubmit={submitHandler}>
                        <div className="row g-3">
                            <div className="col-12">
                                <select
                                    name="topic"
                                    id="topic"
                                    value={values.topic}
                                    onChange={changeHandler}
                                    className="form-control bg-white border-0"
                                    style={{ height: "55px" }}
                                >
                                    <option value="img/colonada.jpg" disabled>Select Topic:</option>
                                    <option value="img/flooding-road.jfif">Blocked Stormwater Drain</option>
                                    <option value="img/childrens-playground.jpg">Children's Playground Repair</option>
                                    <option value="img/fallen-tree.jpg">Fallen Tree</option>
                                    <option value="img/illegal-dumping.JPG">Illegal Dumping</option>
                                    <option value="img/no-parking.png">Improper Parking</option>
                                    <option value="img/public-bin.jpeg">Litter Bins Maintenance and Garbage Collect</option>
                                    <option value="img/lost-belongings.jpg">Lost Belongings</option>
                                    <option value="img/lost-pet.jpeg">Lost Pet</option>
                                    <option value="img/road-maintenance.jpg">Road Maintenance</option>
                                    <option value="img/light-repair.jpg">Street Light Maintenance</option>
                                    <option value="img/vandalism.jpg">Vandalism</option>
                                    <option value="img/water-leak.jpeg">Water Leak</option>
                                </select>
                            </div>
                            <div className="col-12">
                                <input
                                    type="text"
                                    name="title"
                                    value={values.title}
                                    onChange={changeHandler}
                                    className="form-control bg-white border-0"
                                    placeholder="Title"
                                    style={{ height: "55px" }}
                                />
                            </div>
                            <div className="col-12">
                                <input
                                    type="text"
                                    name="location"
                                    value={values.location}
                                    onChange={changeHandler}
                                    className="form-control bg-white border-0"
                                    placeholder="Location"
                                    style={{ height: "55px" }}
                                />
                            </div>
                            <div className="col-12">
                                <textarea
                                    name="description"
                                    value={values.description}
                                    onChange={changeHandler}
                                    className="form-control bg-white border-0"
                                    rows="5"
                                    placeholder="Description"
                                ></textarea>
                            </div>
                            <div className="col-12">
                                <div className="row nav nav-pills justify-content-between">
                                    <div className="col-5">
                                        <button onClick={() => navigate(`/reports/${reportId}/details`)} className="btn btn-secondary w-100 py-3" type="submit">Back</button>
                                    </div>
                                    <div className="col-5">
                                        <button className="btn btn-primary w-100 py-3" type="submit">Edit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}