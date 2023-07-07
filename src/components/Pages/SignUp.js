
import classes from './SignUp.module.css'

import React, { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authAction } from '../storeRedux/authReducer';

const SignUp = () => {
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');
    const [confPass,setconfPass]=useState('')
    const [isCursorAllow,SetisCursorAllow]=useState(true)
    const [isLogin,setIsLogin]=useState(true);
    const redirect=useNavigate();

    const dispatch=useDispatch()

    const emailChangeHandler =(e)=>{
        setemail(e.target.value)
    }
const passwordChangeHandler =(e)=>{
    setpassword(e.target.value)
    SetisCursorAllow(false)
}

    const confPassChangeHandler =(e)=>{
        setconfPass(e.target.value)
        SetisCursorAllow(false)
    };

    const switchAuthModeHandler =()=>{
        setIsLogin((prev)=>!prev)
    }

    const submitHandler = async(e)=>{
        e.preventDefault()
      if(!isLogin){ 
         if(confPass!==password){
            return alert('Confirm password and password is not same');
        }}
        let url;
        if(isLogin){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBQ6bTtVBaFvjcG7dc8ukqQSjqGkRF4ivY';
        }else{
            url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBQ6bTtVBaFvjcG7dc8ukqQSjqGkRF4ivY';
        }
      
        const singUp=await fetch(url,{
            method:'POST',
            body:JSON.stringify({
                email:email,
                password:password
            }),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data=await singUp.json()
        console.log(data,'data');
        if(!singUp.ok){
            alert(data.error.message)
        }else{
            localStorage.setItem('token',data.idToken);
            console.log('sign up successfully');
            localStorage.setItem('email',email)
            dispatch(authAction.login())
            redirect('/')
        }
      
    }
    return (
        <Fragment>
        <section className={classes.auth}>
            <h1>{isLogin ? 'Login' : 'Create new account'}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email'  required onChange={emailChangeHandler} value={email} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input type='password'  required onChange={passwordChangeHandler} value={password} />
                </div>
                {!isLogin && <div className={classes.control}>
                    <label htmlFor='confpassword'>Confirm Password</label>
                    <input type='password' required onChange={confPassChangeHandler} value={confPass} />
                </div>}
                <div className={classes.actions}>
                   {isLogin && <Link className={classes.forget} style={{marginBottom:'5px',textDecoration:'none'}} to='/forgotPassword'>Forgot Password ?</Link>}
                    <button type='submit' style={{'cursor':isCursorAllow ? 'not-allowed':'pointer'}} >{isLogin ? 'Login' : 'Create Account'}</button>
                    <button type='button' className={classes.toggle} onClick={switchAuthModeHandler}>{
                        isLogin ? "Don't have an account sign Up" : 'Login with existing account'
                    }</button>
                </div>
            </form>
        </section>
    </Fragment>
      )
    }
    

export default SignUp