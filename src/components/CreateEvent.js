import React, { useState} from 'react';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import CreatedEventsService from "../services/eventsservice.js"

import "./CreateEvent.css";


const CreateEvent = ({ user }) => {
    let location = useLocation();
    let [editing, setEditing] = useState();

    let [title, setTitle] = useState("");
    let [date,setDate] = useState("");
    let [time, setTime] = useState("");
    let [city, setCity] = useState("");
    let [state, setState] = useState("");
    let [address, setAddress] = useState("");
    let [cost, setCost] = useState("");
    let [tags, setTags]= useState([]);
    let [about, setAbout] = useState("")

    let [message, setMessage] = useState(null);



    const tagsChanged = (e) =>{
        let sel = e.target;
        //console.log()

        var opts = [],
        opt;
        var len = sel.options.length;
        for (var i = 0; i < len; i++) {
        opt = sel.options[i];

        if (opt.selected) {
        opts.push(opt.text);
        // alert(opt.value);
        }
    }
    //console.log(opts)
    setTags(opts)
    }

    React.useEffect(() => {
        if (location.state){
            setEditing(location.state._id);
            setTitle(location.state.title)
            setDate(location.state.date)
            setTime(location.state.start_time)
            setCity(location.state.location_city)
            setState(location.state.location_state)
            setAddress(location.state.address)
            setCost(location.state.cost)
            setAbout(location.state.about)
        }


        console.log(location.state)
        console.log(tags);
    }, [location, tags])

    //console.log("location",location.state)

    //const options = ["show","family", "holiday","food","sport"]
    const resetForm = () => {
        setTitle("")
        setDate("")
        setTime("")
        setCity("")
        setState("")
        setAddress("")
        setCost("")
        setAbout("")
    }

    const saveEvent = () =>{
        var data = {
            title:title,
            date: date,
            start_time: time,
            location_city: city,
            location_state: state,
            address: address,
            about:about,
            cost: cost,
            tags: tags,
        };

        if (editing) {
            data._id = editing
            console.log("Overall",data)
            CreatedEventsService.updateEvent(data)
            .then(response => {
                console.log("response", response)
            })
            .then(()=>{
                setMessage('Success Event Updated !');
                resetForm()
            })
            .catch(e => {
                console.log(e);
            });
        }else{

        CreatedEventsService.createEvent(data)
        .then(response => {
           // console.log(data)
            console.log("response", response)
        })
        .then(() => {
            setMessage('Success Event Created !');
            resetForm();
        })
        .catch((error)=>{
            setMessage("error", error);
        })
    }

    };

    return (
    <Container className='c-font'>
        <h1>{editing ? "Update " : "Create "}Event</h1>
        <form className='form_' >
            {/* {updateFormEvent()} */}
            <input type="text" placeholder='Title' name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            {/* <input type="text" placeholder='Title' name="title"  onChange={updateEvent}/>
            <input type="text" placeholder='Date' name="date" onChange={updateEvent} /> */}
            <input type="text" placeholder='Date' name="date" value={date} onChange={(e) => setDate(e.target.value)}/>
            <input placeholder='Time' name="time" value={time} onChange={(e)=> setTime(e.target.value)} />
            <input placeholder='City' name="city" value={city} onChange={(e)=> setCity(e.target.value)} />
            <input placeholder='State' name="state" value={state} onChange={(e)=> setState(e.target.value)} />
            <input placeholder='Address' name="address" value={address} onChange={(e)=> setAddress(e.target.value)}/>
            <input placeholder='Cost' name="cost" value={cost} onChange={(e)=> setCost(e.target.value)}/>
            <label htmlFor="tags" >Type of event. Select all that apply</label>
            <select className='s-style' name="tags" multiple onChange={tagsChanged}>
            {/* <select className='s-style' name="tags" multiple='multiple'> */}
                <option value="sport">Sport</option>
                <option value="family">Family</option>
                <option value="show">Show</option>
                <option value="holiday">Holiday</option>
                <option value="food">Food</option>
                {/* {options.map((option)=>(
                    <option value={option.value}></option>
                ))} */}
            </select>
            <textarea placeholder='About' name="about" value={about} onChange={(e)=> setAbout(e.target.value)}/>
            <Button className="btn-xl" variant="primary" onClick={saveEvent}
            > Submit </Button>
            <h2>{message}</h2>
        </form>
    </Container>
   )
}


export default CreateEvent;