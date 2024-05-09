import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import validator from "validator";
import Swal from 'sweetalert2';

export default function Register() {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [serverErrors, setServerErrors] = useState(null)
    const [clientErrors, setClientErrors] = useState({})

    const errors = {}

    const runValidations = () => {
        if(firstName.trim().length === 0) {
            errors.firstName = 'First Name is required'
        }

        if(lastName.trim().length === 0) {
            errors.lastName = 'Last Name is required'
        }

        if(email.trim().length === 0) {
            errors.email = 'Email is required'
        } else if(!validator.isEmail(email)) {
            errors.email = 'Invalid email format'
        }

        if(password.trim().length === 0) {
            errors.password = 'Password is required'
        } else if(password.trim().length < 8 || password.trim().length > 128) {
            errors.password = 'Password should be between 8-128 characters'
        }

        if(role.trim().length === 0) {
            errors.role = 'Role is required'
        }

        setClientErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            role: role
        }

        const isValid = runValidations()

        if(isValid) {
            try{
                const response = await axios.post('http://localhost:8055/users/register', formData)
                // Registration successful alert
                Swal.fire({
                    icon: 'success',
                    title: 'Registered Successfully',
                    text: 'You have been successfully registered!',
                    showConfirmButton: false,
                    timer: 2000 // Close alert after 2 seconds
                });
                navigate('/login')
            } catch(err){
                if(err.response) {
                    setServerErrors(err.response.data.errors)
                    // Registration failed alert with error message
                    Swal.fire({
                        icon: 'error',
                        title: 'Registration Failed',
                        text: 'Failed to register. Please check your details and try again.',
                        showConfirmButton: true
                    });
                } 
            }
        } else {
            setClientErrors(errors)
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Register With Us</h2>

                            {serverErrors  && (
                                <div className="alert alert-danger">
                                    <h3>These errors prohibited the form from being saved:</h3>
                                    <ul>
                                        {serverErrors.map((ele, i) => {
                                            return <li key={i}>{ele.msg}</li>
                                        })}
                                    </ul>
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="firstName" className="form-label">Enter First Name</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        value={firstName}
                                        onChange={e => setFirstName(e.target.value)}
                                        id="firstName"
                                    />
                                    {clientErrors.firstName && <span className="text-danger">{clientErrors.firstName}</span>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="lastName" className="form-label">Enter Last Name</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)}
                                        id="lastName"
                                    />
                                    {clientErrors.lastName && <span className="text-danger">{clientErrors.lastName}</span>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Enter Email</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        id="email"
                                    />
                                    {clientErrors.email && <span className="text-danger">{clientErrors.email}</span>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Enter Password</label>
                                    <input 
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        id="password"
                                    />
                                    {clientErrors.password && <span className="text-danger">{clientErrors.password}</span>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="role" className="form-label">Enter Role</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        value={role}
                                        onChange={e => setRole(e.target.value)}
                                        id="role"
                                    />
                                    {clientErrors.role && <span className="text-danger">{clientErrors.role}</span>}
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                    <div className="card-footer">
                        <p>Already have an account? <a href="/login">Login</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
