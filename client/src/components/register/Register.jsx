import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../../hooks/useAuth.js";
import { useForm } from "../../hooks/useForm.js";
import { useState } from "react";

const initialValues = { username: '', email: '', password: '', rePass: '' };

export default function Register() {
    const [error, setError] = useState('');
    const register = useRegister();
    const navigate = useNavigate();

    const registerHandler = async ({ username, email, password, rePass }) => {
        if (password != rePass) {
            return setError('Passwords do not match!');
        }

        try {
            await register(username, email, password);
            navigate('/')
        } catch (err) {
            setError(err.message);
        }
    };

    const { values, changeHandler, submitHandler } = useForm(initialValues, registerHandler);

    return (
        <div className="py-5">
            <div className="bg-dark rounded p-5 mx-auto my-200px" style={{ width: "500px" }}>
                <h3 className="text-light text-uppercase mb-4 text-center">Register</h3>
                <h5 className="text-primary text-uppercase mb-4 text-center">Please provide all required details</h5>
                <form onSubmit={submitHandler}>
                    <div className="row g-3">
                        <div className="col-12">
                            <input
                                type="text"
                                name="username"
                                value={values.username}
                                onChange={changeHandler}
                                className="form-control bg-white border-0"
                                placeholder="Username"
                                style={{ height: "55px" }}
                            />
                        </div>
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
                            <input
                                type="password"
                                name="rePass"
                                value={values.rePass}
                                onChange={changeHandler}
                                className="form-control bg-white border-0"
                                placeholder="Repeat Password"
                                style={{ height: "55px" }}
                            />
                        </div>
                        {error && (
                            <p className="text-uppercase" style={{ color: "red" }}>
                                <span>{error}</span>
                            </p>
                        )}
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