import mongoose from "mongoose";

let isConnected = false; //track the connection

export const connectToDb = async ()=>{

    //avoid erros
    mongoose.set('strictQuery', true);
    
    //check if connect
    if(isConnected){
        console.log('MongoDb is connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName: 'share_prompts',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected= true;
        console.log('MongoDb is connected');
        
    } catch (error) {
        console.log(error);
        
    }
}