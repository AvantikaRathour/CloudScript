import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
const Signup = (props) => {
    const { showAlert } = props;
    const navigate = useNavigate();
    const host = 'http://localhost:5000';
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (credentials.password !== credentials.cpassword) {
            showAlert("Passwords do not match", "danger");
            return; // Exit the function if passwords don't match
        }
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authtoken)
            navigate("/");
            showAlert("Account Created Successfully", "success")
        }
        else {
            showAlert("Invalid Details", "danger")
        }
    }

    const onchange = (e) => {
        // spread operator to make shallow copy 
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
            <form>
            <h2>Signup to continue...</h2>

                <div className="mb-3">

                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" id="uname" aria-describedby="emailHelp" onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" onChange={onchange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name="cpassword" id="cpassword" onChange={onchange} minLength={5} required />
                </div>

                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Signup</button>
            </form>
        </>
    )
}
export default Signup;