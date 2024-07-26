import { Link } from "react-router-dom";

export default function Login() {
    return (
        <div className="py-5">
            <div className="bg-dark rounded p-5 mx-auto my-200px" style={{ width: "500px" }}>
                <h3 className="text-light text-uppercase mb-4 text-center">Login</h3>
                <h5 className="text-primary text-uppercase mb-4 text-center">Please enter your email and password</h5>
                <form>
                    <div className="row g-3">
                        <div className="col-12">
                            <input type="email" name="email" className="form-control bg-white border-0" placeholder="Email" style={{ height: "55px" }} />
                        </div>
                        <div className="col-12">
                            <input type="password" name="password" className="form-control bg-white border-0" placeholder="Password" style={{ height: "55px" }} />
                        </div>
                        <div className="col-12">
                            <button className="btn btn-primary w-100 py-3" type="submit">Login</button>
                        </div>
                        <div className="col-12" style={{ textAlign: "right" }}>
                            <Link to={"/register"} className="text-light text-uppercase font-weight-bold">Not registered?</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}