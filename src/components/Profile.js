import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import "bootstrap/dist/css/bootstrap.min.css";
//import Image from 'react-bootstrap/Image'


const Profile = ({ user }) => {
    const navigate = useNavigate();
    let params = useParams();

return (
    <Container>

        <h1>Profile Page coming soon</h1>
        <h2>Hi {user.name}</h2>
        <img src={`${user.picture}`} className="rounded-circle" alt="Google Id" width="350" height="300"/>

    </Container>

)
}
export default Profile;