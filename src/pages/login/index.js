import React from 'react';
import './styles.css';

import brandingImg from '../../assets/brand.png';
import padlockImg from '../../assets/padlock.png';

export default function Login(){
    return (
        
        <div className="login-container">

            <section className="form">
                <img src={brandingImg} alt="Products Logo"/>
                <form>
                    <h1>Access your Account</h1>
                    <input placeholder="Username" />
                    <input type="password" placeholder="Password" />

                    <button type="submit" className="button">Login</button>
                </form>
            </section>

            <img src={padlockImg} alt="Login"/>

        </div>
        
    );
}