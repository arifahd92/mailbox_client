import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import SignUp from '../Pages/SignUp'

export default function Protected({ Component }) {
    const isAuth = useSelector(state => state.auth.isAuthenicate)
    const navigate = useNavigate(null)
    useEffect(() => {

        if (!!isAuth == false) {
            navigate("/")
            return;
        }
    }, [isAuth])
    return (
        <div>
            <Component />
        </div>
    )
}
