import React, { useState, useEffect } from 'react';
import './App.css';

// ⬇️ This defines a fixed target date (100 days from now)
const fixedTargetDate = new Date();
fixedTargetDate.setDate(fixedTargetDate.getDate() + 100);
fixedTargetDate.setHours(17, 57, 59, 0);

const ComingSoon = () => {
    const calculateTimeLeft = () => {
        const difference = fixedTargetDate - new Date();
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
        fetch(
            'https://script.google.com/macros/s/AKfycbye7QFIvczZaj9IZ0XxDpR1ka-r86pDBOCHaw-H9BBPjInbDoiZmWCvZETnU2NRvNscwA/exec',
            {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            }
        )
            .then(() => {
                alert('Subscribed successfully!');
                setEmail('');
            })
            .catch((error) => {
                console.error('Error:', error);
                setEmail('');
            });
    };

    return (
        <div className="container">
            <h1>COMING SOON</h1>
            <p>ვებ-გვერდი მზადების პროცესშია, სიახლეებისთვის გამოგვიწერეთ!</p>
            <p>Our website is under construction, follow us for updates now!</p>

            <div className="countdown">
                {['Days', 'Hours', 'Minutes', 'Seconds'].map((label, index) => (
                    <div key={index} className="time-box">
                        <span>
                            {timeLeft[label.toLowerCase()]
                                ?.toString()
                                .padStart(2, '0') || '00'}
                        </span>
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
            <p>კონტაქტი:</p>
            <p>Our Contact:</p>
            <p>E-mail: posserviceg@gmail.com</p>
        </div>
    );
};

export default ComingSoon;
