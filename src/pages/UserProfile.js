import React from 'react'
import { useParams } from "react-router-dom";
import SEO from '../components/SEO';
import AllLinks from '../components/UserProfile/AllLinks';
const UserProfile = () => {
    const { username } = useParams()
    return (
        <>
            <SEO title={username} />
            <AllLinks username={username} />
        </>
    )
}

export default UserProfile