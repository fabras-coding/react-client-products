import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './styles.css';

import brandingImg from '../../assets/brand.png';
import padlockImg from '../../assets/padlock.png';
import authApi from '../../services/authApi';

export default function Login(){

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function login(e){
        e.preventDefault();

        const data = {userName, password};

        try{

            const response = await authApi.post('/token', data);
            localStorage.setItem('userName', userName);
            localStorage.setItem('token', response.data.access_token.token);

            navigate('/products');
            
        } catch (error) {
            console.error(error);
            alert('Login failed, try again.');
        }
    }


    return (
        
        <div className="login-container">

            <section className="form">
                <img src={brandingImg} alt="Products Logo"/>
                <form onSubmit={login}>
                    <h1>Access your Account</h1>

                    <input placeholder="Username" value={userName} onChange={e => setUserName(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

                    <button type="submit" className="button">Login</button>
                </form>
            </section>

            <img src={padlockImg} alt="Login"/>

        </div>
        
    );
}