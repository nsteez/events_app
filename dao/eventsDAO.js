import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId

let events;

export default class EventsDAO{
    static async injectDB(conn) {
        if (events) {
            return;
        }
        try {
            events = await conn.db(process.env.EVENTSFINDER_NS)
                                  .collection('events')
        }
        catch(e) {
            console.error(`Unable to connect in EventsDAO: ${e}`);
        }
    }
    //data retrival methods

    static async getAll(){
        try {
            return await events.find()
            .toArray()

        } catch (e){
            console.error(`Unable to find all ${e}`);
            return []

        }

    }


    static async getEventById(id){
        try {
            return await events.find(
                {
                    // $match: {
                    //     _id: new ObjectId(id),
                    // }
                    _id:ObjectId(id)
                },
            ).next();
        } catch(e) {
            console.error(`Something went wrong in getEventById: ${e}`);
            throw e;
        }
    }
}