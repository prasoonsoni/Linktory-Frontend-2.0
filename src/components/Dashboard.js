import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            navigate("/")
        }
    })
    return (
        <div>Dashboard</div>
    )
}

export default Dashboard