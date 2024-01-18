import React, { useState, useEffect } from 'react';
import CreatedEventsService from '../services/eventsservice';
import { useParams, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import './EventCard.css';
//import eventsservice from '../services/eventsservice';

const EventCard = ({user}) => {
    const navigate = useNavigate()
    let params = useParams();
    //const [event_, setEvent] = useState({});

    const [event_, setEvent] = useState({
        id: null,
        title: "",
        date: "",
        start_time: "",
        location_city: "",
        location_state: "",
        address: "",
        about:"",
        cost: "",
        tags: []

    });

    useEffect(() => {
        const getEvent = id => {
            CreatedEventsService.getEventById(id)
            .then(response => {
                console.log(response);
                setEvent(response.data);
            })
            .catch(e => {
                console.log(e);
            })
        }
        getEvent(params.id)

    }, [params.id]);

    return(
        <div>
            {/* {user && user.googleId === event_.userId} */}
            <Container>
                <Row>
                    <Col>
                    <Card className='card' onClick={() => navigate("/events/"+ event_._id)}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmGoyz62N2arDsb0y8HB_TvsWLpMleH5f-fg&usqp=CAU" alt="beaming lights"/>
                        <Card.Title className='card-header'>{event_.title}</Card.Title>
                        <Card.Body className='card-body'>
                        {/* <span class="tag tag-teal">{event_.tags[0]}</span> */}

                        <Card.Text className="text_">{event_.about}</Card.Text>
                        <Card.Text>{event_.date}</Card.Text>
                        <Card.Text>{event_.start_time}</Card.Text>
                        <Card.Text>{event_.cost}</Card.Text>
                    </Card.Body>
                    <div className='buttons'>
                    <Button className="action_btn" onClick={ () => {
                        CreatedEventsService.getEventById(params.id)
                            .then(response =>{
                                setEvent(response.data);
                               navigate("/createevent", {state:event_})
                            })
                    }}>Edit</Button>
                    <Button className="action_btn" onClick={ () => {
                        var data = {
                            _id:event_._id
                        }

                       CreatedEventsService.deleteEvent(data)
                       .then(response => {
                            console.log(response)
                            alert("Event successfully deleted")
                            navigate("/events")
                       })
                       .catch(e => {
                            console.log(e);
                       });

                    }}>Delete</Button>
                    </div>
                        </Card>
                    </Col>
                    <Col>
                    <div className=''>

                    </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )


}

export default EventCard;