import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
} from "react-router-dom";
const UserProfile = () => {
    const { username } = useParams()
    return (
        <div>{username}</div>
    )
}

export default UserProfile