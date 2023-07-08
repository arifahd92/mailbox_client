
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { mailSliceAction } from '../storeRedux/emailReducer';
import classes from './SentBox.module.css'

const SentBox = () => {
    const dispatch=useDispatch();
    const [reRender,setreRender]=useState(true)
    const mailInSentbox=useSelector(state=>state.mail.sendMails);
    const myEmail=localStorage.getItem('email').replace(/['@','.']/g,'');

    const deleteHandler=async(id)=>{
        try {
            const response= await fetch(`https://mailboxdatabase-405d3-default-rtdb.firebaseio.com/sentbox/${myEmail}/${id}.json`,{
                method:'DELETE'
            })  
            const deleteData=await response.json();
            setreRender((prev)=>!prev)
        } catch (error) {
            alert(error)
        }
    }

    

    let data=[];

    useEffect(()=>{
        const fetchDaata=async()=>{
           try {
            const reponse=await fetch(`https://mailboxdatabase-405d3-default-rtdb.firebaseio.com/sentbox/${myEmail}.json`);

            const mailData=await reponse.json();
            console.log('useEffectcalled', mailData);
            for(let key in mailData){
                data=[{id:key,...mailData[key]},...data]
            }

            dispatch(mailSliceAction.updateSentbox(data))
          console.log(mailInSentbox,'mailInSentbox');
           } catch (error) {
            alert(error)
           }
        }
        fetchDaata();
    },[reRender])
    console.log(data,'data');
  return (
    <div className={classes.main}>
       {mailInSentbox.length>0 ?
  (<div className={classes.row}>
            {

                mailInSentbox.map((item)=>(
                    <div className={classes.row1} key={item.id}>
                    <div className={classes.user}>To :- {item.to}</div>
            <div className={classes.subject}>Subject :- {item.subject}</div>
            {/* <div className={classes.msg}>
                <NavLink to={`/message/${item.id}`}>{'{message}'}</NavLink>
            </div> */}
            <div className={classes.msg}>
                message :- {item.message}
            </div>
             <div className={classes.delete}>
                <button onClick={deleteHandler.bind(null,item.id)}>Delete</button>
            </div>
            </div>
                ))

            }
        </div>) : <p>Sentbox is empty</p>}
    </div>
  )
}

export default SentBox