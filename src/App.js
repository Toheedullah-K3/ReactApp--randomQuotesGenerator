import React, { useState, useEffect } from "react";
import axios from "axios";
import './style.css';

export default function App() {
    const [advice, setAdvice] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAdvice();
    }, []);

    const fetchAdvice = () => {
        setLoading(true);
        axios.get('https://api.adviceslip.com/advice')
            .then((response) => {
                const { advice } = response.data.slip;
                setAdvice(advice);
            })
            .catch((error) => {
                console.error('Error fetching advice:', error);
                setAdvice('Oops! Something went wrong. Please try again.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const buttonClicked = () => {
        fetchAdvice();
    };

    return (
        <div className="app">
            <div className="card">
                <h2 className="advice-heading">{loading ? 'Loading...' : advice}</h2>
                <button className="button" onClick={buttonClicked} disabled={loading}>
                    <span>{loading ? 'Fetching...' : 'GIVE ME ADVICE!'}</span>
                </button>
            </div>
        </div>
    );
}
