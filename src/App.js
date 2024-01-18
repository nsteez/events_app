import { GoogleOAuthProvider } from '@react-oauth/google';
import { Routes, Route, Link, useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect,  } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from "react-bootstrap/Navbar";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Login from "./components/Login";
import Logout from "./components/Logout";
import Profile from "./components/Profile";
import Home from "./components/Home.js";

import "./App.css";
import CreateEvent from './components/CreateEvent';
import EventsAll from './components/EventsAll';
import EventCard from './components/EventCard';


// import { GoogleLogin } from 'react-google-login';
// import { gapi } from 'gapi-script';


function App() {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const [user, setUser] = useState(null);
  let navigate = useNavigate();


  const routeChange = () => {
    let path = '/profile';
    navigate(path);
  }

  useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem("login"));
    if (loginData) {
      let loginExp = loginData.exp;
      let now = Date.now()/1000;
      if (now < loginExp) {
        //Not expired
        setUser(loginData);
      } else {
        //Expired
        localStorage.setItem("login", null);
      }
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId={clientId}>
    <div className="App">
      <Navbar bg="light" expand="lg">
      <Container fluid >
        <Navbar.Brand href="/">
          <img className="logo-style" src="../appPhotos/logo.png" alt="events-app logo"></img>
        </Navbar.Brand>

        {/* <Navbar.Collapse id="navbarScroll"> */}
          <Nav
            className="navbar justify-content-center"
            style={{ minHeight: '70px' }}
            navbarScroll
          >
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/profile">Profile</Nav.Link>
          <Nav.Link href="/createevent">Create-Event</Nav.Link>
          <Nav.Link href="/events">Events</Nav.Link>
          </Nav>
          {/* <Form className="d-flex form1">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 form-stretch"
              aria-label="Search"
            />   <Button variant="outline-success">Search</Button>

            </Form> */}
          {/* <Nav.Link as={Link} to={"/ProfilePage"} style={{ "padding-right": '70px' }}>Login</Nav.Link> */}
          { user ? (<Logout setUser={setUser} /> ) : (<Login setUser={setUser} />)}
        {/* </Navbar.Collapse> */}
      </Container>
    </Navbar>

    <Routes>
    <Route path={"/home"} user={ user } element={<Home
          // user={ user }
          // addFavorite={ addFavorite }
          // deleteFavorite={ deleteFavorite }
          // favorites={ favorites }
          // saveFavorites={saveFavorites}
          />}
          />


    <Route path={"/profile"} element={<Profile user={user}/>}/>
    <Route path={"/events/:id/"} element={<EventCard user={ user } />} />
    <Route path={"/createevent"} user={user} element={<CreateEvent/>}/>
    <Route path={"/events"} element={<EventsAll user={ user }/>}/>

    </Routes>
    </div>
    </GoogleOAuthProvider>
  );
}

export default App;