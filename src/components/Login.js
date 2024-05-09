import { useState } from "react";
import { Link } from "react-router-dom";
import validator from 'validator'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Swal from 'sweetalert2';

export default function Login() {
    const navigate = useNavigate()
    
    const [form, setForm] = useState({
        email:'',
        password:'',
        serverErrors: null,
        clientErrors: {}
    })

    const errors = {}

    const runValidations = () => {
        if(form.email.trim().length === 0) {
            errors.email = 'Email is required'
        } else if(!validator.isEmail(form.email)){
            errors.email = 'Invalid email format'
        }

        if(form.password.trim().length === 0){
            errors.password = 'Password is required'
        } else if(form.password.trim().length < 8 || form.password.trim().length > 128) {
            errors.password = 'Invalid password length'
        }
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const formData = {
            email: form.email,
            password: form.password
        }

        runValidations()

        if(Object.keys(errors).length === 0) {
            try{
                const response = await axios.post('http://localhost:8055/users/login', formData)
                localStorage.setItem('token', response.data.token)
                // Login successful alert
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'You have been successfully logged in!',
                    showConfirmButton: false,
                    timer: 2000 // Close alert after 2 seconds
                });
                navigate('/')
            } catch(err) {
                setForm({...form, serverErrors: err.response.data.errors, clientErrors: {}})
                // Login failed alert with error message
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Failed to login. Please check your credentials and try again.',
                    showConfirmButton: true
                });
            }
        } else {
            setForm({...form, clientErrors: errors})
        }
    }

    const handleChange=(e)=>{
        const { value, name } = e.target
        setForm({...form, [name]: value})
    } 

    const displayErrors = ()=>{
        let result
        if(typeof form.serverErrors === 'string') {
            result= <p>{form.serverErrors}</p>
        } else {
            result = (
                <>
                <h3>These errors prohibited the form being saved:</h3>
                <ul>
                    {form.serverErrors.map((ele, i) =>{
                        return <li key={i}>{ele.msg}</li>
                    })}
                </ul>
                </>
            )
        }
        return result
    }
    

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Login</h2>
                            {form.serverErrors && displayErrors()}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Enter Email</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        value={form.email}
                                        onChange={handleChange}
                                        name="email"
                                        id="email"
                                    />
                                    {form.clientErrors.email && <span className="text-danger">{form.clientErrors.email}</span>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Enter Password</label>
                                    <input 
                                        type="password"
                                        className="form-control"
                                        value={form.password}
                                        onChange={handleChange}
                                        name="password"
                                        id="password"
                                    />
                                    {form.clientErrors.password && <span className="text-danger">{form.clientErrors.password}</span>}
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                            <Link to="/register" className="btn btn-link">Create an account</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
