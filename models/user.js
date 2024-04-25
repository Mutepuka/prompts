import { Schema, model, models } from "mongoose";

//create a users schema

const UserSchema = new Schema({
    email:{
        type: String,
        unique: [true, 'Email already exits'],
        required: [true, 'Email is required']
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
      },
      image: {
        type: String,
      }
});
//model stores models varaible so check if the model called user exists if not assign
const User = models.User || model("User", UserSchema);

export default User;