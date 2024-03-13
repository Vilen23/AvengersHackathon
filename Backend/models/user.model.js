const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Shivam:itsbeens0long@cluster0.ezyirm3.mongodb.net/Hackathon')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    profilepicture:{
        type: String,
        default: 'https://www.gravatar.com/avatar/'
    },
    level:{
        type: String,
        default: ""
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;

