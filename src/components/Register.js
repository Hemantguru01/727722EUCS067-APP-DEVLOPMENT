import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        phoneNumber: ''
    });
    const [verificationCode, setVerificationCode] = useState('');
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [generatedCode, setGeneratedCode] = useState('');
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        if (!formData.fullName) newErrors.fullName = 'Full Name is required';
        if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
        if (!isPhoneVerified) newErrors.phoneNumber = 'Please verify your phone number';
        return newErrors;
    };

    const handleVerifyPhone = () => {
        if (!formData.phoneNumber) {
            setErrors({ ...errors, phoneNumber: 'Phone Number is required' });
            return;
        }
        
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedCode(code);
        alert(`Verification code sent: ${code}`); 
    };

    const handleCheckCode = () => {
        if (verificationCode === generatedCode) {
            setIsPhoneVerified(true);
            alert('Phone number verified successfully');
        } else {
            alert('Invalid verification code');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            // Handle registration logic
            console.log('Form Data Submitted:', formData);
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
                {errors.username && <p className="error">{errors.username}</p>}
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                {errors.email && <p className="error">{errors.email}</p>}
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                {errors.password && <p className="error">{errors.password}</p>}
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                <label htmlFor="fullName">Full Name:</label>
                <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} />
                {errors.fullName && <p className="error">{errors.fullName}</p>}
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
                <button type="button" onClick={handleVerifyPhone}>Send Verification Code</button>
                <label htmlFor="verificationCode">Verification Code:</label>
                <input type="text" id="verificationCode" name="verificationCode" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
                <button type="button" onClick={handleCheckCode}>Verify Code</button>
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
}

export default Register;
