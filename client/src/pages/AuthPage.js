import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import {useHttp} from '../hooks/http.hook'
import { useMessage } from "../hooks/message.hook";

export const AuthPage = () => {

    const auth = useContext(AuthContext)

    const {loading, request, error, clearError} = useHttp()
    const message = useMessage()
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        message(error);
        clearError()
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message)
        } catch (error) {
            console.log(error);
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            console.log(data);
            auth.login(data.token, data.userId)
        } catch (error) {
            console.log(error);
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
                                value={form.email} 
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
                                value={form.password} 
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
                            onClick={loginHandler}
                        >
                                Login
                            </button>
                       <button 
                            className="btn grey lighten-5 black-text"
                            disabled={loading}
                            onClick={registerHandler}
                        >
                            Registration
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}