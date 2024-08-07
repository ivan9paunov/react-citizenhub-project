import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useRegister } from "../../hooks/useAuth.js";
import { useForm } from "../../hooks/useForm.js";
import useClickOutside from "../../hooks/useClickOutside.js";

const initialValues = { username: '', email: '', password: '', rePass: '' };

export default function Register() {
    const register = useRegister();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const emailPattern = /^[a-z][a-z0-9._-]*@[a-z]+\.[a-z]{2,4}(\.[a-z]{2,4})?$/;
    const usernamePattern = /^[a-z][a-z0-9._-]*$/;
    const passwordPattern = /^\S{6,}$/;

    const registerHandler = async ({ username, email, password, rePass }) => {
        const newErrors = {};

        if (!username) {
            newErrors.username = 'Username is required';
        } else if (!usernamePattern.test(username.trim().toLowerCase())) {
            newErrors.username = 'Invalid username format';
        }

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!emailPattern.test(email.trim().toLowerCase())) {
            newErrors.email = 'Invalid email format';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (!passwordPattern.test(password.trim())) {
            newErrors.password = 'Password must be at least 6 characters and contain no spaces';
        }

        if (password.trim() != rePass.trim()) {
            newErrors.missmatch = 'Passwords do not match';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            throw new Error("Validation failed");
        }

        try {
            await register(username.trim().toLowerCase(), email, password.trim());
            
            navigate('/');
        } catch (err) {
            setErrors({ general: err.message });
        }
    };

    const { values, changeHandler, submitHandler } = useForm(initialValues, registerHandler);

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
                <h3 className="text-light text-uppercase mb-4 text-center">Register</h3>
                <h5 className="text-primary text-uppercase mb-4 text-center">Please provide all required details</h5>
                <form onSubmit={submitHandler}>
                    <div className="row g-3">
                        <div className="col-12">
                            <input
                                type="text"
                                name="username"
                                ref={textareaRef}
                                value={values.username}
                                onChange={changeHandler}
                                className={`form-control bg-white ${errorBorder(errors.username)}`}
                                placeholder="Username"
                                style={{ height: "55px" }}
                            />
                            {errors.username && errorMsg(errors.username)}
                        </div>
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
                        <div className="col-12">
                            <input
                                type="password"
                                name="rePass"
                                ref={textareaRef}
                                value={values.rePass}
                                onChange={changeHandler}
                                className={`form-control bg-white ${errorBorder(errors.password || errors.missmatch)}`}
                                placeholder="Repeat Password"
                                style={{ height: "55px" }}
                            />
                            {errors.missmatch && errorMsg(errors.missmatch)}
                        </div>
                        {errors.general && errorMsg(errors.general, 'center')}
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