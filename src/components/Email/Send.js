import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import classes from './Send.module.css'
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import React, { Fragment, useState } from 'react'

const Send = () => {

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');

    const EmailchangeHandler = (e) => {
        setEmail(e.target.value);
    }

    const SubjectchangeHandler = (e) => {
        setSubject(e.target.value);
    }

    const editorHandler = (editorState) => {
        setEditorState(editorState)
        //    console.log(editorState.getCurrentContent().getPlainText(),'editorState');

    }
    const submitHandler = (e) => {
        e.preventDefault();
        const sender = localStorage.getItem('email');
        const sender1 = sender.replace(/['@','.']/g, '');
        const receiver = sender.replace(/['@','.']/g, '');
        console.log("object")
        console.log(sender, receiver);
        fetch(`https://mailbox-client-a7da2-default-rtdb.firebaseio.com/sentbox/${sender1}.json`, {
            method: 'POST',
            body: JSON.stringify({
                to: email,
                subject: subject,
                message: editorState.getCurrentContent().getPlainText()

            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (!res.ok) {
                alert(res.error.message)
            } else {
                console.log('successfull');
                console.log(sender1);
                setEditorState('');
                setSubject('');
                setEmail('');
            }
        })
        fetch(`https://mailbox-client-a7da2-default-rtdb.firebaseio.com/inbox/${receiver}.json`, {
            method: 'POST',
            body: JSON.stringify({
                sender: sender,
                subject: subject,
                message: editorState.getCurrentContent().getPlainText(),
                dot: true
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (!res.ok) {
                alert(res.error.message)
            } else {
                console.log('successfull');
            }
        })
    }

    return (
        <Fragment>
            <div className={classes.main}>
                <Form className={`${classes.To}`} onSubmit={submitHandler} >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>To</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={EmailchangeHandler} />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Subject</Form.Label>
                        <Form.Control type="text" value={subject} onChange={SubjectchangeHandler} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Send
                    </Button>
                </Form>

                <div className={classes.editor}>
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={editorHandler}
                    />
                </div>


            </div>

        </Fragment>
    )
}

export default Send