import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


export default function ProtectedPage({ Component }) {
    const isAuth = useSelector(state => state.auth.isAuthenicate)
    const navigate = useNavigate(null)
    useEffect(() => {

        if (!!isAuth) {
            navigate("/send")
            return
        }
    })
    return (
        <div>
            <Component />
        </div>
    )
}
