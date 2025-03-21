import React, { useState, useEffect } from 'react';
import './App.css';

const ComingSoon = () => {
    const calculateTimeLeft = () => {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 35); // 35 days from now
        targetDate.setHours(17, 57, 59, 0);

        const difference = targetDate - new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [email, setEmail] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleSubscribe = () => {
        alert(`Subscribed with email: ${email}`);
        setEmail('');
    };

    return (
        <div className="container">
            <h1>COMING SOON</h1>
            <p>Our website is under construction, follow us for updates now!</p>

            <div className="countdown">
                {['Days', 'Hours', 'Minutes', 'Seconds'].map((label, index) => (
                    <div key={index} className="time-box">
                        <span>{timeLeft[label.toLowerCase()] || '00'}</span>
                        <p>{label}</p>
                    </div>
                ))}
            </div>

            <div className="subscribe-box">
                <input
                    type="email"
                    placeholder="Enter Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={handleSubscribe}>Subscribe</button>
            </div>
        </div>
    );
};

export default ComingSoon;
