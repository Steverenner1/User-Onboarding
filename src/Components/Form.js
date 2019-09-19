import React, { useState, useEffect } from "react";
import {withFormik, Form, Field} from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({values, errors, touched, status}) => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        status && setUsers(users => [...users, status]);
    }, [status])
    
    return(
        <div className="user-form">
            <Form>
                <Field
                    type="text"
                    name="name"
                    placeholder="Name"
                />
                {touched.name && errors.name && (<p classname="error">{errors.name}</p>)}
                <Field
                    type="text"
                    name="email"
                    placeholder="Email"
                />
                {touched.email && errors.email && (<p className="error">{errors.email}</p>)}
                <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                />
                {touched.password && errors.password && (<p className="error">{errors.password}</p>)}
                <label className = "checkbox-container">
                    <Field type = "checkbox"
                        name="terms"
                        checked={values.terms}
                    />
                </label>
                <button>Submit</button>
            </Form>
            {users.map(user => (
                <ul key={user.id}>
                    <li>Name:{user.name}</li>
                    <li>Email:{user.email}</li>
                    <li>Password:{user.password}</li>
                </ul>
            ))}

        </div>

    );
};
const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, terms}) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required("Please enter a valid name").length(5|"Must be exactly 5 characters"),
        // name: Yup.string().length(5 | "Must be exactly 5 characters"),
        email: Yup.string().required("Please enter a valid email").max(10|"Email can't be more than 10 characters"),
        password: Yup.string().required("Please enter a valid password").min(8|"Password must be at least 8 characters")
    }),
    handleSubmit(values, {setStatus}) {
        axios
        .post("https://reqres.in/api/users/", values)
        .then(response => {
            setStatus(response.data);
        })
        .catch(error => console.log(error.response));
    }
})(UserForm)
console.log("This is the HOC", FormikUserForm);
export default FormikUserForm;