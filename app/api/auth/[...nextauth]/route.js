import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";
import NextAuth from "next-auth/next";

const handler = NextAuth({

    //array of provider google, github, facebook, twiiter but we only use google 
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRETE_ID
        })
    ],

    //function to invokde the user sign or profile
    callbacks:{
        async session({session}){
            const sessionUser = await User.findOne({email: session.user.email})
            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({profile}){
            try {
                await connectToDB();

                //check if user already exits
                const userExists = await User.findOne({email: session.user.email});

                if(!userExists){
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture,
                    });
                }
                return true;
                
            } catch (error) {
                console.log('User create error', error);
                return false;
                
            }
        }
        
    }
})

export {handler as GET, handler as POST}