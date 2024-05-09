import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Account() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:8055/users/account', {
                    headers: {
                        Authorization: ` ${localStorage.getItem('token')}`
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                navigate('/login');
            }
        };
        
        fetchUser()
    }, [navigate])

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">Account Information</h2>
                    {user && (
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>Name:</strong> {user.firstName} {user.lastName}</li>
                            <li className="list-group-item"><strong>Email:</strong> {user.email}</li>
                            <li className="list-group-item"><strong>Role:</strong> {user.role}</li>
                        </ul>
                    )}
                    <button onClick={handleLogout} className="btn btn-danger mt-3">Logout</button>
                </div>
            </div>
        </div>
    );
}
