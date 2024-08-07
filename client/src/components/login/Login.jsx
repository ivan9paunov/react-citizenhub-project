import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "../../hooks/useForm.js";
import { useLogin } from "../../hooks/useAuth.js";
import useClickOutside from "../../hooks/useClickOutside.js";


const initialValues = { email: '', password: '' };

export default function Login() {
    const login = useLogin();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const loginHandler = async ({ email, password }) => {
        const newErrors = {};

        if (!email) {
            newErrors.email = 'Email is required';
        }

        if (!password) {
            newErrors.password = 'Password is required'
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            throw new Error("Validation failed");
        }

        try {
            await login(email.toLowerCase(), password.trim());

            navigate('/')
        } catch (err) {
            setErrors({ general: err.message });
        }
    };

    const { values, changeHandler, submitHandler } = useForm(initialValues, loginHandler);

    const errorBorder = (error) => `${error ? 'border-danger-thick' : 'border-0'}`;
    const errorMsg = (error, align) => (
        <p className="text-uppercase mb-0" style={{ textAlign: `${align ? 'center' : 'end'}`, color: "red" }}>
            {error}
        </p>
    );

    const textareaRef = useClickOutside(() => setErrors(''));

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
                                ref={textareaRef}
                                value={values.email}
                                onChange={changeHandler}
                                className={`form-control bg-white ${errorBorder(errors.email)}`}
                                placeholder="Email"
                                style={{ height: "55px" }}
                            />
                            {errors.email && errorMsg(errors.email)}
                        </div>
                        <div className="col-12">
                            <input
                                type="password"
                                name="password"
                                ref={textareaRef}
                                value={values.password}
                                onChange={changeHandler}
                                className={`form-control bg-white ${errorBorder(errors.password)}`}
                                placeholder="Password"
                                style={{ height: "55px" }}
                            />
                            {errors.password && errorMsg(errors.password)}
                        </div>
                        {errors.general && errorMsg(errors.general, 'center')}
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