import React, { useState } from 'react';
import {useHttp} from '../hooks/http.hook';

export const CreatePage = () => {
    
    const [link, setLink] = useState('');
    const request = useHttp();

    const pressHandler = async e => {
        if (e.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link});
                console.log(data);
            } catch (error) {}
        }
    }
    return (
        <div className='row'>
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input 
                        placeholder="Enter your link" 
                        id="link"
                        type="text" 
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        onKeyDown={pressHandler}
                    />
                    <label className="active" htmlFor="email">Your link</label>
                </div>
            </div>
        </div>
    )
}