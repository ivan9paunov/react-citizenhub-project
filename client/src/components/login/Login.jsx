import { Link, useNavigate } from "react-router-dom";

import { useForm } from "../../hooks/useForm.js";
import { useLogin } from "../../hooks/useAuth.js";

const initialValues = { email: '', password: '' };

export default function Login() {
    const login = useLogin();
    const navigate = useNavigate();
    const loginHandler = async ({ email, password }) => {
        try {
            await login(email, password);
            navigate('/')
        } catch (err) {
            console.log(err.message);
        }
    };

    const { values, changeHandler, submitHandler } = useForm(initialValues, loginHandler);

    return (
        <div className="py-5">
            <div className="bg-dark rounded p-5 mx-auto my-200px" style={{ width: "500px" }}>
                <h3 className="text-light text-uppercase mb-4 text-center">Login</h3>
                <h5 className="text-primary text-uppercase mb-4 text-center">Please enter your email and password</h5>
                <form onSubmit={submitHandler}>
                    <div className="row g-3">
                        <div className="col-12">
                            <input
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={changeHandler}
                                className="form-control bg-white border-0"
                                placeholder="Email"
                                style={{ height: "55px" }}
                            />
                        </div>
                        <div className="col-12">
                            <input
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={changeHandler}
                                className="form-control bg-white border-0"
                                placeholder="Password"
                                style={{ height: "55px" }}
                            />
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