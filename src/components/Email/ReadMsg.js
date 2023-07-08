
import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import classes from './ReadMsg.module.css';

const ReadMsg = () => {
    const {id}=useParams();
    const mails=useSelector(state=>state.mail.mails);
    const myEmail=localStorage.getItem('email').replace(/['@','.']/g,'');

    const singleMail=mails.filter((item)=>item.id===id);
    const message=singleMail[0].message
    console.log(mails,'Single-message');
    useEffect(()=>{
      const fetchData=async ()=>{
      try {
          const response=await fetch(`https://mailboxdatabase-405d3-default-rtdb.firebaseio.com/inbox/${myEmail}/${id}.json`,{
            method:'PATCH',
            body:JSON.stringify({
              dot:false
            }),
            headers:{
              'Content-Type':'application/json'
            }
          })
          const data=await response.json();
          console.log(data);
        }
       catch (error) {
        alert(error)
      }
    }
      fetchData();
    },[])

  return (
    <Fragment>
    <div className={classes.message}>{message}</div>
    </Fragment>
  )
}

export default ReadMsg