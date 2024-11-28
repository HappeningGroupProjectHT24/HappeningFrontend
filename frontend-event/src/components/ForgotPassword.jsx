import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [userName, setUsername] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const forgotPasswordEndpoint = 'https://happeningevent.azurewebsites.net/api/Auth/forgot-password';
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleReturn = () => {
        navigate('/login');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        try {
            const response = await fetch(forgotPasswordEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName }),
            });

            if (response.ok) {
                setMessage("An email has been sent to your email address")
                setTimeout(() => navigate('/login'), 2000); // Optional delay
            } else {
                const errorData = await response.json();
                console.error('Error Response:', errorData); // Debugging
                setMessage(errorData.message || 'An error occurred while sending the reset request.');
            }
        } catch (error) {
            console.error('Fetch Error:', error); // Debugging
            setMessage('Failed to connect to the server. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md bg-BloodOrange"
        >
            <div className="mb-4">
                <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Fyll i ditt användarnamn:
                </label>
                <input
                    type="text"
                    id="username"
                    value={userName}
                    onChange={handleUsernameChange}
                    placeholder="Your username"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>
            <button
                type="submit"
                className={`w-full py-2 px-4 font-semibold rounded-md transition ${isSubmitting
                    ? 'bg-gray-400 text-gray-800 cursor-not-allowed'
                    : 'bg-BloodOrange text-white hover:bg-blue-700'
                    }`}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
            <button
                type="button" // Ensure this button doesn't submit the form
                onClick={handleReturn}
                className="w-full py-2 px-4 font-semibold rounded-md transition bg-BloodOrange text-white mt-2"
            >
                Tillbaka
            </button>
            {message && (
                <div
                    className={`mt-4 text-sm ${message.includes('error') || message.includes('Failed')
                        ? 'text-red-500'
                        : 'text-green-500'
                        }`}
                >
                    {message}
                </div>
            )}
        </form>
    );
};

export default ForgotPassword;
