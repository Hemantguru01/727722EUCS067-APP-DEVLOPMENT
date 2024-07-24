import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Login.css';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        let newErrors = {};
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.password) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
           
            console.log('Form Data Submitted:', formData);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="login-container">
            <h2 >Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
                {errors.username && <p className="error">{errors.username}</p>}
                
                <label htmlFor="password">Password:</label>
                <div className="password-container">
                    <input
                        type={passwordVisible ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <FontAwesomeIcon
                        icon={passwordVisible ? faEyeSlash : faEye}
                        onClick={togglePasswordVisibility}
                        className="password-icon"
                    />
                </div>
                {errors.password && <p className="error">{errors.password}</p>}
                
                <button type="submit">Login</button>
            </form>
            <p >Don't have an account? <Link to="/register">Register</Link></p>
        </div>
    );
}

export default Login;
