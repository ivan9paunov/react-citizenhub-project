import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext.jsx";
import { useForm } from "../../hooks/useForm.js";
import { useCreateReport } from "../../hooks/useReports.js";

const initialValues = {
    topic: 'img/colonada.jpg',
    title: '',
    location: '',
    description: ''
};

export default function ReportAdd() {
    const navigate = useNavigate();
    const createReport = useCreateReport();
    const { username } = useAuthContext();
    const [errors, setErrors] = useState({});

    const createHandler = async (values) => {
        const newErrors = {};

        if (!values.topic || values.topic == "img/colonada.jpg") {
            newErrors.topic = 'Topic is required';
        }

        if (!values.title) {
            newErrors.title = 'Title is required';
        }

        if (!values.location) {
            newErrors.location = 'Location is required';
        }

        if (!values.description) {
            newErrors.description = 'Description is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            throw new Error("All fields are required");
        }

        try {
            const { _id: reportId } = await createReport({ ...values, author: username });

            navigate(`/reports/${reportId}/details`);
        } catch (err) {
            setErrors({ general: err.message });
            throw err;
        }
    };

    const { values, changeHandler, submitHandler } = useForm(initialValues, createHandler);

    return (
        <div className="py-5">
            <div className="row bg-dark">
                <div className="col-md-6 my-auto">
                    <img src={values.topic} alt="" style={{ float: "right" }} />
                </div>
                <div className="col-md-6 p-5 my-200px" style={{ width: "500px" }}>
                    <h3 className="text-light text-uppercase mb-4 text-center">New Report</h3>
                    {!Object.keys(errors).length
                        ? <h5 className="text-primary text-uppercase mb-4 text-center">Please provide detailed information</h5>
                        : <h5 className="text-danger text-uppercase mb-4 text-center">All fields are required</h5>
                    }
                    <form onSubmit={submitHandler}>
                        <div className="row g-3">
                            <div className="col-12">
                                <select
                                    name="topic"
                                    id="topic"
                                    value={values.topic}
                                    onChange={changeHandler}
                                    className={`form-control bg-white ${errors.topic ? 'border-danger-thick' : 'border-0'}`}
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
                                    className={`form-control bg-white ${errors.title ? 'border-danger-thick' : 'border-0'}`}
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
                                    className={`form-control bg-white ${errors.location ? 'border-danger-thick' : 'border-0'}`}
                                    placeholder="Location"
                                    style={{ height: "55px" }}
                                />
                            </div>
                            <div className="col-12">
                                <textarea
                                    name="description"
                                    value={values.description}
                                    onChange={changeHandler}
                                    className={`form-control bg-white ${errors.description ? 'border-danger-thick' : 'border-0'}`}
                                    rows="5"
                                    placeholder="Description"
                                ></textarea>
                            </div>
                            <div className="col-12">
                                <button className="btn btn-primary w-100 py-3" type="submit">Report</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}