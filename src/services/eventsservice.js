import axios from 'axios';

class CreatedEventsService {
    getAll(){
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/events`);
    }

    find(query, by="title"){
        return axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/events?${by}=${query}`);
    }

    getEventById(id){
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/${id}`);
    }

    createEvent(data) {
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/createevent`, data);
    }
    updateEvent(data){
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/createevent`, data);
    }
    deleteEvent(data){
        return axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/v1/createevent`, {data: data} );
    }

}
export default new CreatedEventsService();