import React, { useState, useEffect } from 'react';

const About = (props) => {
    const { showAlert } = props;
    // State to store the username
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const host = "http://localhost:5000"

    // Fetch username from the backend
    useEffect(() => {
        const fetchUsername = async () => {

            try {

                const response = await fetch(`${host}/api/auth/username`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        "auth-token": localStorage.getItem('token')
                    },
                });
                const json = await response.json();
                setUsername(json.name);
                setLoading(false);

            }
            catch (err) {
                setError('Please Login/Signup....');
                setLoading(false);
            }

        }
        fetchUsername();
    }, []);
    if (loading) {
        return <h5>Loading...</h5>;
    }

    // Handle error state
    if (error) {
        return <h5>{error}</h5>;
    }

    return (
        <div>
            <h1>About Page</h1>
            <p>Welcome, {username}!</p>
        </div>
    );
};

export default About;
