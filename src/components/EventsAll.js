import CreatedEventsService from '../services/eventsservice';
import React, { useState, useEffect, useCallback } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
//import EventCard from './EventCard.js'
import {redirect, useNavigate} from 'react-router-dom'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import "./EventsAll.css";



const EventsAll = ({
    user,
}) => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");


const retrieveAllEvents = useCallback(()=>{
    //let eventlist = [];
    if (events.length > 0) {
        return
    }

    CreatedEventsService.getAll()
    .then(response => {
        console.log(response)
        setEvents(response.data)
    // }).then(()=>{
    //     setEvents(eventlist);
    //     console.log(eventlist)
    })
    .catch(e => {
        console.log(e);
    });

})

useEffect(()=>{
    retrieveAllEvents()
},[events, retrieveAllEvents])

//useEffect(() => {
const filterEvents = useCallback(() =>{
    let filteredResults = []
    console.log(searchTerm)
    //const filterResults = events.title.filter(searchTerm)
    console.log("tags",events[1].tags)
    for (let i = 0; i < events.length; i++){
        if (events[i].title.includes(searchTerm) || events[i].tags.includes(searchTerm)){
           filteredResults.push(events[i])
        }
    }

    //console.log("filtered events",filteredResults)
    //events = filteredResults
    //console.log("events",events)
    setEvents(filteredResults)
})

return (

    <Container className='container0 events-all-body'>
        <Form className="d-flex form1">
            <Form.Control
            type="search"
            placeholder="Search"
            className="me-2 form-stretch"
            aria-label="Search" onChange={(e) => setSearchTerm(e.target.value)}
            />   <Button className='btn-sm' variant="outline-success" onClick={filterEvents}>Search</Button>
        </Form>
         <Row>
            {events.map((event_)=> {
                return(
                    <Col key={event_._id} className="col-4">
                        <Card className='card' onClick={() => navigate("/events/"+ event_._id)}>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmGoyz62N2arDsb0y8HB_TvsWLpMleH5f-fg&usqp=CAU" alt="beaming lights"/>
                                <Card.Title className='card-header'>{event_.title}</Card.Title>
                                <Card.Body className='card-body'>
                                <span className="tag tag-teal">{event_.tags[0]}</span>
                                <Card.Text className="text_">{event_.about}</Card.Text>
                                <Card.Text>Date: {event_.date}</Card.Text>
                                <Card.Text>Time: {event_.start_time}</Card.Text>
                                <Card.Text>Cost: {event_.cost === "Free" ? event_.cost:"$" +event_.cost}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                )
            })}
        </Row>
    </Container>
)}
export default EventsAll;