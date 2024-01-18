import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';


const Home = () => {
    // const navigate = useNavigate();
    // let params = useParams();

return (
    <Container fluid>

        <div className="row" style={{ "marginTop": '25px', "position": "relative"}}>

        <div className="col-7 main-div-1">
        <img className="main-div-photo-1" src="../appPhotos/concert.jpg" alt="concert goers throwing their hands up"></img>
        {/* <Image src={`public/appPhotos/concert.jpg`}></Image> */}
        </div>

        <div className="col-5">
            <p className="main-div-blurb">Check out the newest events in your area!</p></div>
        </div>


         <div className="row" style={{ "marginTop": '25px', "position": "relative"}}>
         <div className="col-4 main-div-2">
         <img className="main-div-2-img"
         src="../appPhotos/sport.jpg"
         alt="tennis rachet and ball"></img>
         <p>Sport</p>
         </div>

         <div className="col-4 main-div-2">
         <img className="main-div-2-img"
         src="../appPhotos/stage-show.jpg"
         alt="stage play"></img>
         <p>Shows</p>
         </div>
         <div className="col-4 main-div-2">
         <img className="main-div-2-img"
         src="../appPhotos/family2.jpg"
         alt="family cooking together"></img>
         <p>Family</p>
         </div>
         </div>
    </Container>


)}

export default Home;