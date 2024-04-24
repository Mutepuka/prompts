import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

{/**create handler for authentication */}
const handler= NextAuth({
    //providers portals for connection eg google github etc
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRETE
        })
    ],
    //function to communicate to providers
    callbacks:{
        async session({session}){
            //store the users id from MongoBD to the session

        }

    }
});

export {handler as GET, handler as POST};