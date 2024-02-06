import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function SignUp(props) {
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' })
    let navigate = useNavigate();
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;

    const getUrl = (path) => {
        console.log(SERVER_URL + path)
        return SERVER_URL + path
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch(getUrl("/api/auth/createuser"), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();

        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Account Created Successfully", "success");
            navigate('/');
        }
        else {
            props.showAlert("Invalid Credentials", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className={`signup-container mx-auto' id='SignUp' ${props.mode === 'light' ? 'signupContainer-light' : 'signupContainer-dark'} `} style={{ padding: '0px' }}>
            <form className="signup-form" onSubmit={handleSubmit} style={{ color: props.mode === 'light' ? 'black' : 'white' }}>
                <h2>Create an Account</h2>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={onChange} required aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} required autoComplete="current-email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} required minLength={8} autoComplete="current-password" />
                </div>
                <div className="form-group">
                    <span htmlFor="terms-text" id="terms-text">By creating an account, you agree to CloudNotes <a href="/#" id="privacy-policy-link">Privacy Policy</a> and <a href="/#" id="terms-of-use-link">Terms of Use</a>.</span>
                </div>
                <div className='button-container my-3'>
                    <button type="submit" className="btn btn-primary mx-2">Sign Up</button>
                </div>
                <div className="form-group">
                    <span htmlFor="terms-text" id="term-text">Already have an account? <Link to="/login"
                        id="terms-of-use-link">Sign In</Link></span>
                </div>
            </form>
        </div>
    )
}

export default SignUp
