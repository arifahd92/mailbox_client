import classes from './Welcome.module.css';

import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../storeRedux/authReducer';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { mailSliceAction } from '../storeRedux/emailReducer';


const Welcome = () => {
  const dispatch = useDispatch();
  const [reRender, setreRender] = useState(true);
  const unRead = useSelector(state => state.mail.unRead)
  const myEmail = localStorage.getItem('email').replace(/['@','.']/g, '');

  let intervalID;
  intervalID = setInterval(() => {
    setreRender((prev) => !prev);
  }, 3000);

  const clearInteravl = () => {
    clearInterval(intervalID);
    console.log(intervalID);
  }

  const logoutHandler = () => {
    dispatch(authAction.logout());
  }
  let noOfUnread = 0;

  useEffect(() => {
    const fetchDaata = async () => {
      try {
        const reponse = await fetch(`https://mailbox-client-a7da2-default-rtdb.firebaseio.com/inbox/${myEmail}.json`);

        const mailData = await reponse.json();
        for (let key in mailData) {
          if (mailData[key].dot === true) {
            noOfUnread++
          }
        }

        dispatch(mailSliceAction.updateUnread(noOfUnread))
      } catch (error) {
        alert(error)
      }

    }
    fetchDaata();
    return clearInterval(intervalID);
  }, [reRender])

  return (
    <Fragment>
      <div className={classes.main}>
        <div className={classes.header}>
          <div className={classes.welcome}>{`Welcome To Mail Box `}</div>
          < Link to='/send' style={{ textDecoration: 'none' }}>Compose Email</Link>
          <Link to='/inbox' style={{ textDecoration: 'none' }}>Inbox {unRead}</Link>
          <Link to='/sentbox' style={{ textDecoration: 'none' }}>Sentbox</Link>
          <Button onClick={logoutHandler}>Logout</Button>
        </div>
      </div>

    </Fragment>
  )
}

export default Welcome

