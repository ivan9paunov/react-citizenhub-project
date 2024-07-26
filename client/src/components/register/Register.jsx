import { Link } from "react-router-dom";

export default function Register() {
    return (
        <div className="py-5">
            <div className="bg-dark rounded p-5 mx-auto my-200px" style={{ width: "500px" }}>
                <h3 className="text-light text-uppercase mb-4 text-center">Register</h3>
                <h5 className="text-primary text-uppercase mb-4 text-center">Please provide all required details</h5>
                <form>
                    <div className="row g-3">
                        <div className="col-12">
                            <input type="text" name="username" className="form-control bg-white border-0" placeholder="Username" style={{ height: "55px" }} />
                        </div>
                        <div className="col-12">
                            <input type="email" name="email" className="form-control bg-white border-0" placeholder="Email" style={{ height: "55px" }} />
                        </div>
                        <div className="col-12">
                            <input type="password" name="password" className="form-control bg-white border-0" placeholder="Password" style={{ height: "55px" }} />
                        </div>
                        <div className="col-12">
                            <input type="password" name="rePass" className="form-control bg-white border-0" placeholder="Repeat Password" style={{ height: "55px" }} />
                        </div>
                        <div className="col-12">
                            <button className="btn btn-primary w-100 py-3" type="submit">Register</button>
                        </div>
                        <div className="col-12" style={{ textAlign: "right" }}>
                            <Link to={"/login"} className="text-light text-uppercase font-weight-bold">Already have an account?</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}