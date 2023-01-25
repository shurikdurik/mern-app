import React, { useState } from 'react';
import {useHttp} from '../hooks/http.hook'

export const AuthPage = () => {

    const {loading, request, error, clearError} = useHttp()

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            console.log(data);
        } catch (error) {
            
        }
    }

    return (
        <div className='row'>
            <div className="col s6 offset-s3">
                <h1>Cut link</h1>
                <div className="card indigo darken-4">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div className="input-field">
                            <input 
                                placeholder="Enter your e-mail" 
                                id="email"
                                name="email"
                                type="text" 
                                className="validate" 
                                onChange={changeHandler}
                            />
                            <label className="active" htmlFor="email">E-mail</label>
                        </div>
                        <div className="input-field">
                            <input 
                                placeholder="Enter your password" 
                                id="password" 
                                name="password"
                                type="password" 
                                className="validate" 
                                onChange={changeHandler}
                            />
                            <label className="active" htmlFor="password">Password</label>
                        </div>
                    </div>
                    <div className="card-action">
                       <button 
                            className="btn green darken-4" 
                            style={{marginRight: 10}}
                            onClick={registerHandler}
                        >
                                Login
                            </button>
                       <button 
                            className="btn grey lighten-5 black-text"
                            disabled={loading}
                        >
                            Registration
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}