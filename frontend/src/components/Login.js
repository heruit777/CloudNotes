import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login(props) {
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    let navigate = useNavigate();
    
    const getUrl = (path) => {
        return SERVER_URL + path
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(getUrl('/api/auth/login'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();

        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Logged in Successfully", "success");
            navigate('/');
        }
        else {
            props.showAlert("Invalid Details", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='signup-container mx-auto' id='SignIn' style={{ padding: '0px' }}>
            <form className="signup-form" onSubmit={handleSubmit} style={{ backgroundColor: 'burlywood', borderRadius: '8px' }}>
                <h2>Welcome Back ッ</h2>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} autoComplete="current-email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} autoComplete="current-password" />
                </div>
                <div className='button-container my-3'>
                    <button type="submit" className="btn btn-primary mx-2">Sign In</button>
                </div>
                <div className="form-group">
                    <span htmlFor="terms-text" id="term-text">Create an account <Link to="/signup"
                        id="terms-of-use-link">Sign Up</Link></span>
                </div>
            </form>
        </div>
    )
}

export default Login
