import mongodb, { ObjectId } from 'mongodb';
// const ObjectId = mongodb.ObjectId;

let events;

export default class CreatedeventsDAO {
    static async injectDB(conn) {
        if (events) {
            return;
        }
        try {
            events = await conn.db(process.env.EVENTSFINDER_NS).collection('events')
        } catch(e) {
            console.error(`injectDB Unable to establish connection handle in eventsDAO: ${e}`);
        }
    }
    static async addEvent(title, date, time, city,state, address, about,cost, tags) {
        try{
            const eventDoc = {
                // eventId: eventId,
                title: title,
                date: date,
                start_time: time,
                location_city: city,
                location_state: state,
                address: address,
                about:about,
                cost: cost,
                tags: tags
            }
            return await events.insertOne(eventDoc);
        } catch (e) {
            console.log(`addEvent Unable to post event: ${e}`)
            return { error: e};
        }
    }

    static async updateEvent(_id, title, date, time, city,state, address, about,cost, tags){
        //console.log(_id)
        try {
            return await events.updateOne(
                {_id : ObjectId(_id)},
                { $set: {  title: title,
                    date: date,
                    start_time: time,
                    location_city: city,
                    location_state: state,
                    address: address,
                    about:about,
                    cost: cost,
                    tags: tags }}

            );
        } catch(e){
            console.error(`Unable to update review: ${e}`)
            return { error: e };
        }
    }

    static async deleteEvent(_id){
       // console.log("trying id",_id)
        try{
            return await events.deleteOne(

                {_id : ObjectId(_id)},
                // user_id: userId,}
            )
        }catch (e) {
            console.log(`deleteEvent unable to delete event: ${error}`)
            return(error)
        }
    }



}
