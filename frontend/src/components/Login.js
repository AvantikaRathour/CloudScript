import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
const Login=(props)=>{
  const {showAlert} =props;

    const host='http://localhost:5000';
    const [credentials,setcredentials]=useState({email:"",password:""});
    const navigate=useNavigate();
    const handleSubmit=async (e)=>{

        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
              'Content-Type':'application/json',
            },
          body:JSON.stringify({email:credentials.email,password:credentials.password})
          });
          const json=await response.json();
          console.log(json);      
            //  Save the auth token and  redirect
            if (json.success) {
              localStorage.setItem('token', json.authtoken)
              navigate("/");
              showAlert("Logged In Successfully" ,"success")
  
          }
          else {
            showAlert("Invalid Details", "danger")
          }
          
    }
    const onchange = (e) => {
        // spread operator to make shallow copy 
        setcredentials({...credentials,[e.target.name]:e.target.value})
    }
    return (
        <>
        <form className="container">
    <h2 className="mb-3 ">Login to continue...</h2>

  <div className="mb-3 ">
    <label htmlFor="emial" class="form-label">Email address</label>
    <input type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp"  onChange={onchange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" id="password" onChange={onchange}/>
  </div>
 
  <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Login</button>
</form>
        </>
    )
}
export default Login; 