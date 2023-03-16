//stylesheet
import './CreateAccount.css';

//dependencies
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

//database
import { getDatabase, ref, set } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth'

//constants
import { database } from '../../util/Constants';

//assets
import closedEye from '../../assets/closed-eye_icon.png';
import openEye from '../../assets/open-eye_icon.png';

const CreateAccount = () => {
    const auth = getAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [passwordIsHidden, setPasswordIsHidden] = useState(true);
    const [confirmPasswordIsHidden, setConfirmPasswordIsHidden] = useState(true);
    const [passwordsDoMatch, setPasswordsDoMatch] = useState(true);

    const handleSubmit = () => {
        if(password === confirmPassword) {
            createAccount();
        } else {
            setPassword('');
            setConfirmPassword('');
            setPasswordsDoMatch(false);
        }
    }

    const createAccount = () => {
        const db = getDatabase();

        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const userId = userCredential.user.uid;
            const user = {id: userId};
            set(ref(db, database.usersKey + userId), user);
            navigate( database.usersKey + userId + database.userRecipesKey);
        }).catch ((e) => {
            console.log(e);
        })
    }

    return(
        <div className='create-account'>
            <h2>CREATE ACCOUNT</h2>
            <input 
                placeholder='Email'
                aria-label="Email"
                type='text'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <div className='passwords'>
                <input 
                    placeholder='Password'
                    aria-label="Password"
                    type={passwordIsHidden ? 'password' : 'text'}
                    className='password-input'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <img 
                    src={passwordIsHidden? openEye : closedEye} 
                    alt={passwordIsHidden ? 'hide password' : 'reveal password'}
                    onClick={() => setPasswordIsHidden(!passwordIsHidden)}
                />
            </div>

            <div className='passwords'>
                <input 
                    placeholder='Confirm Password'
                    aria-label="Confirm Password"
                    type={confirmPasswordIsHidden ? 'password' : 'text'}
                    className='password-input'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <img 
                    src={confirmPasswordIsHidden ? openEye : closedEye} 
                    alt={confirmPasswordIsHidden ? 'hide password' : 'reveal password'}
                    onClick={() => setConfirmPasswordIsHidden(!confirmPasswordIsHidden)}
                />
            </div>

            <div className='submit' id={passwordsDoMatch ? 'success' : 'error'}>
                {!passwordsDoMatch && <span>Passwords do not match</span>}
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default CreateAccount;