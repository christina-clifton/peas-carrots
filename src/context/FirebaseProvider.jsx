import React, { useState, useEffect, useContext } from 'react';
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import firebaseConfig from '../util/Firebase';
import { initializeApp } from 'firebase/app';
import { child, getDatabase, push, ref, update } from 'firebase/database';
import { FirebaseDatabase } from '../util/Constants';

export const FirebaseContext = React.createContext(undefined);

const FirebaseProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const databaseRef = ref(getDatabase(app));

    let KEY_USERS = FirebaseDatabase.usersKey;
    let KEY_MY_RECIPES = FirebaseDatabase.myRecipesKey;

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            user ? setUser(user) : setUser(null);
        });
        return unsubscribe;
    }, [])

    const saveUserAccount = (email, password, username, uid) => {
        const account = {
            email,
            username,
            password
        }

        const USER_ID = uid;
        const usersPath = KEY_USERS + USER_ID;

        const updates = {};
        updates[usersPath] = account;

        return update(databaseRef, updates);
    }

    const saveRecipe = (recipe) => {
        const USER_ID = 'QmZlilCp4FhkEoZKxhl4dBzB7cO2';
        const myRecipesPath = KEY_USERS + USER_ID + KEY_MY_RECIPES;

        if(!recipe.title) {
            return alert('Recipe title is required');
        } else {
            const newPostKey = push(child(databaseRef, myRecipesPath)).key;
            recipe.id = newPostKey;

            const updates = {};
            const recipeUrl = myRecipesPath + newPostKey;
            updates[recipeUrl] = recipe;

            return update(databaseRef, updates);
        }
    }

    const editRecipe = (recipe) => {
        const USER_ID = 'QmZlilCp4FhkEoZKxhl4dBzB7cO2';
        const RECIPE_ID = recipe.id;
        const myRecipesPath = KEY_USERS + USER_ID + KEY_MY_RECIPES;

        const updates = {};
        const recipeUrl = myRecipesPath + RECIPE_ID;
        updates[recipeUrl] = recipe;

        return update(databaseRef, updates);
    }

    return (
        <FirebaseContext.Provider
            value={{
                user,
                setUser,
                login: (email, password, navigation) => {
                    signInWithEmailAndPassword(auth, email, password).then(() => {
                        navigation.navigate('/');
                    })
                },

                signUp: (email, password, username, navigation) => {
                    createUserWithEmailAndPassword(auth, email, password).then(() => {
                        saveUserAccount(email, password, username, auth.currentUser.uid)
                        navigation.navigate('/');
                    })
                },

                logout: () => {
                    signOut(getAuth());
                },
            }}
        >
            {children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseProvider;