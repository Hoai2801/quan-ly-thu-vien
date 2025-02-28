'use client'
import React, {useState} from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Username:', username);
        console.log('Password:', password);
        fetch('http://localhost:8080/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Login failed');
            }
        }).then(data => {
            console.log(data);
            localStorage.setItem('jwt', data.access_token);
            window.location.href = '/';
        })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <body className="font-inter overflow-hidden">
        <section className="flex justify-center relative">
            <img src="https://pagedone.io/asset/uploads/1702362010.png" alt="gradient background image"
                 className="w-full h-full object-cover fixed"/>
            <div className="mx-auto max-w-lg px-6 lg:px-8 absolute py-20">
                <h2 className="text-gray-900 text-center font-manrope text-3xl font-bold leading-10 mb-11">Đăng nhập</h2>
                <div className="rounded-2xl bg-white shadow-xl">
                    <form action="" className="lg:p-11 p-7 mx-auto">
                        {/*<div className="mb-11">*/}
                        {/*    <h1 className="text-gray-900 text-center font-manrope text-3xl font-bold leading-10 mb-2">Welcome*/}
                        {/*        Back</h1>*/}
                        {/*    <p className="text-gray-500 text-center text-base font-medium leading-6">Let’s get started*/}
                        {/*        with your 30 days free trail</p>*/}
                        {/*</div>*/}
                        <input type="text"
                               value={username}
                               onChange={handleUsernameChange}
                               className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-6"
                               placeholder="Username"/>
                        <input type="text"
                               value={password}
                               onChange={handlePasswordChange}
                               className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-1"
                               placeholder="Password"/>
                        <a href="javascript:;" className="flex justify-end mb-6">
                            <span className="text-indigo-600 text-right text-base font-normal leading-6">Forgot Password?</span>
                        </a>
                        <button
                            onClick={handleSubmit}
                            className="w-full h-12 text-white text-center text-base font-semibold leading-6 rounded-full hover:bg-indigo-800 transition-all duration-700 bg-indigo-600 shadow-sm mb-11">Login
                        </button>
                        <a href="javascript:;"
                           className="flex justify-center text-gray-900 text-base font-medium leading-6"> Don’t have an
                            account? <span className="text-indigo-600 font-semibold pl-3"> Sign Up</span>
                        </a>
                    </form>
                </div>
            </div>
        </section>
        </body>
    );
};

export default Login;
