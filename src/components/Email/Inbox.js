import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { mailSliceAction } from '../storeRedux/emailReducer';
import classes from './Inbox.module.css'

const Inbox = () => {
  const dispatch = useDispatch();
  const mailInInbox = useSelector(state => state.mail.mails);
  const [reRender, setreRender] = useState(true)
  const myEmail = localStorage.getItem('email').replace(/['@','.']/g, '');

  const deleteHandler = async (id) => {
    try {
      const response = await fetch(`https://mailbox-client-a7da2-default-rtdb.firebaseio.com/inbox/${myEmail}/${id}.json`, {
        method: 'DELETE'
      })
      const deleteData = await response.json();
      console.log(deleteData);
      setreRender((prev) => !prev)
    } catch (error) {
      alert(error)
    }
  }

  let data = [];

  useEffect(() => {
    const fetchDaata = async () => {
      try {
        console.log(myEmail)
        const reponse = await fetch(`https://mailbox-client-a7da2-default-rtdb.firebaseio.com/inbox/${myEmail}.json`);

        const mailData = await reponse.json();
        console.log(mailData)
        console.log('useEffectcalled', mailData);
        for (let key in mailData) {
          data = [{ id: key, ...mailData[key] }, ...data]
        }

        dispatch(mailSliceAction.updateInbox(data))
      } catch (error) {
        alert(error)
      }

    }
    fetchDaata();
  }, [reRender])
  return (
    <div className={classes.main}>
      {mailInInbox.length > 0 ?
        (<div className={classes.row}>
          {

            mailInInbox.map((item) => (
              <div className={classes.row1} key={item.id}>
                <div className={classes.user}>From :- {item.sender}</div>
                <div className={classes.subject}>{item.subject}</div>
                <div className={classes.msg}>
                  <NavLink to={`/message/${item.id}`} style={{ textDecoration: 'none' }}>{'{message}'}</NavLink>
                  {/* when any one will click on this a dynamic rout will be hitted with item -id and Read message will be renderd*/}
                </div>
                {item.dot && <div className={classes.dot}>
                  {/* //dot logic */}
                </div>}
                <div className={classes.delete}>
                  <button onClick={deleteHandler.bind(null, item.id)}>Delete</button>
                </div>
              </div>
            ))

          }
        </div>) : <p>Inbox is empty</p>}

    </div>
  )
}

export default Inbox