import { useEffect, useState } from "react";

export function useForm(initialValues, submitCallback, reinitializeForm = false) {
    const [values, setValues] = useState(initialValues);

    // Reainitialize form values
    useEffect(() => {
        if (reinitializeForm) {
            setValues(initialValues);
        }
    }, [initialValues, reinitializeForm]); 

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await submitCallback(values);
            
            setValues(initialValues);
        } catch (error) {
            console.error("Submission failed:", error);
        }
    };

    return {
        values,
        changeHandler,
        submitHandler
    };
}