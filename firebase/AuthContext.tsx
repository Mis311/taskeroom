import { GoogleAuthProvider, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth"
import React, { useContext, useEffect, useState } from "react"
import { auth } from "./firebase"

const AuthContext = React.createContext<any>(null)

const provider = new GoogleAuthProvider()

export function useAuth() {
    return useContext(AuthContext)
}

/* 
Usage:

    first import the useAuth:
    import { useAuth } from 'path_name'

    Inside a react component, you can get reference to the current user like follows:
    
    const {currentUser} = getAuth()
    currentUser will be null if not signed in
    
    currentUsers have a unique id on them: currentUser.uid
    
    Use SignUp/Login functions:
    const {signUpUser} = getAuth()

    call this within an async function using:

    await signUpUser(email,password)
    or
    await login(email,password)

    then the currentUser will be set if the signUp/Login is successful

    you cant track this by using the following logic:

    useEffect(() => {
        if (currentUser) {
            // Do something on sign Up / Log In
        }
    }, [currentUser])

    the same follows for the logOut function which will log the user out and set the currentUser back to null
    

*/

export function AuthProvider({ children }:any) {
    const [currentUser, setCurrentUser] = useState<any>()
    const [loading, setLoading] = useState(true)

    function signUpUser(email:string,password:string, role:string, username:string) {
        return createUserWithEmailAndPassword(auth, email, password).then(function(result1) {
            return updateProfile(result1.user, {displayName: role}).then(function(result) {
                fetch('http://taskeroom.akubuezeernest.com/save_user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user_id: result1.user.uid,
                        user_email: email,
                        user_name: username,
                        status: role
                    })
                })
            })
        })
    }

    function googleSignIn(role?:string) {
        return signInWithPopup(auth, provider).then(function(result) {
            if (role) {
                fetch('http://taskeroom.akubuezeernest.com/save_user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user_id: result.user.uid,
                        user_email: result.user.email,
                        user_name: result.user.displayName,
                        status: role
                    })
                }).then(function(result2) {
                return updateProfile(result.user, {displayName: role})
                })
            } else {
                return 
            }
            
        })
    }

    function logIn(email:string, password:string) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logOut() {
        return auth.signOut()
    }

    useEffect(() => {
        const unsubscribe =  auth.onAuthStateChanged(user => {
         setCurrentUser(user)    
         setLoading(false)
         })
 
         return unsubscribe
     }, [])

     const value:object = {
        currentUser,
        logIn,
        logOut,
        signUpUser,
        googleSignIn
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
      )

}