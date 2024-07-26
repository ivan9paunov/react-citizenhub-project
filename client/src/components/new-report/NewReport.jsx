import { useState } from "react";

export default function NewReport() {
    const [formValues, setFormValues] = useState({
        topic: 'colonada.jpg'
    });

    const changeHandler = (e) => {
        setFormValues(oldValues => ({
            ...oldValues,
            [e.target.name]: e.target.value
        }));
    }

    return (
        <div className="py-5">
            <div className="row bg-dark">
                <div className="col-md-6 my-auto">
                    <img src={`img/${formValues.topic}`} alt="" style={{ float: "right" }} />
                </div>
                <div className="col-md-6 p-5 my-200px" style={{ width: "500px" }}>
                    <h3 className="text-light text-uppercase mb-4 text-center">New Report</h3>
                    <h5 className="text-primary text-uppercase mb-4 text-center">Please provide detailed information</h5>
                    <form>
                        <div className="row g-3">
                            <div className="col-12">
                                <select
                                    name="topic"
                                    id="topic"
                                    value={formValues.topic}
                                    onChange={changeHandler}
                                    className="form-control bg-white border-0"
                                    style={{ height: "55px" }}
                                >
                                    <option value="colonada.jpg" selected disabled>Select Topic:</option>
                                    <option value="flooding-road.jfif">Blocked Stormwater Drain</option>
                                    <option value="childrens-playground.jpg">Children's Playground Repair</option>
                                    <option value="fallen-tree.jpg">Fallen Tree</option>
                                    <option value="illegal-dumping.JPG">Illegal Dumping</option>
                                    <option value="no-parking.png">Improper Parking</option>
                                    <option value="public-bin.jpeg">Litter Bins Maintenance and Garbage Collect</option>
                                    <option value="lost-belongings.jpg">Lost Belongings</option>
                                    <option value="lost-pet.jpeg">Lost Pet</option>
                                    <option value="road-maintenance.jpg">Road Maintenance</option>
                                    <option value="light-repair.jpg">Street Light Maintenance</option>
                                    <option value="vandalism.jpg">Vandalism</option>
                                    <option value="water-leak.jpeg">Water Leak</option>
                                </select>
                            </div>
                            <div className="col-12">
                                <input type="text" name="username" className="form-control bg-white border-0" placeholder="Title" style={{ height: "55px" }} />
                            </div>
                            <div className="col-12">
                                <input type="email" name="email" className="form-control bg-white border-0" placeholder="Location" style={{ height: "55px" }} />
                            </div>
                            <div className="col-12">
                                <textarea className="form-control bg-white border-0" rows="5" placeholder="Description"></textarea>
                            </div>
                            <div className="col-12">
                                <button className="btn btn-primary w-100 py-3" type="submit">Register</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}