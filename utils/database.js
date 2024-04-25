import mongoose from "mongoose";

//track connection status
let isConnected = false;

//export the mongoose database function
export const connectToDB = async()=> {
    //get rid of all the erros 
    mongoose.set('strictQuery', true);

    //check if is connected
    if(isConnected){
        console.log('MongoDb is already connected');
        return;
    }

    // estatblish connection if not connected
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName: 'share_prompt',
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        isConnected= true;
        console.log('MongoDb connected')
    } catch (error) {
        console.log(error)
        
    }
}