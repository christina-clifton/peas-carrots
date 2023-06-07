//stylesheet
import './SignIn.css';

//dependencies
import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

//database
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

//context
import { useAuth } from '../../util/auth';

//assets
import closedEye from '../../assets/closed-eye_icon.png';
import openEye from '../../assets/open-eye_icon.png';

const SignIn = () => {
    const firebaseAuth = getAuth();
    const localAuth = useAuth();
    const navigate = useNavigate();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordIsHidden, setPasswordIsHidden] = useState(true);

    const handleLogin = () => {
        signInWithEmailAndPassword(firebaseAuth, email, password).then((userCredential) => {
            const userId = userCredential.user.uid;
            localAuth.signIn(userId);
            navigate(`/users/${userId}/recipes`, {state: userId});
        }).catch ((e) => {
            console.log(e);
        })
    }

    return(
        <div className='login'>
            <h2>SIGN IN</h2>
            <input 
                placeholder='Email'
                aria-label="Email"
                aria-required='true'
                type='text'
                id='email-input'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <div className='password'>
                <input 
                    placeholder='Password'
                    aria-label="Password"
                    aria-required='true'
                    type={passwordIsHidden ? 'password' : 'text'}
                    id='password-input'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => { if(e.keyCode === 13) handleLogin() }}
                />
                <img 
                    src={passwordIsHidden? openEye : closedEye} 
                    alt={passwordIsHidden ? 'hide password' : 'reveal password'}
                    onClick={() => setPasswordIsHidden(!passwordIsHidden)}
                />
            </div>
            
            <button onClick={handleLogin} className='submit'>Submit</button>
            <span className='create-account-text'>Don't have an account?
                <br/>
                <Link 
                    to='/create-account'
                    className='link'
                    id='create-account-link'
                >
                    Create one.
                </Link></span>
        </div>
    )
}

export default SignIn;