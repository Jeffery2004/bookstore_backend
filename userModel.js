const mongoose=require('mongoose');
const Schema=new mongoose.Schema({
    isbn:{
        type:Number,
        required:true,
    },
    author:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    reviews:{
        type:String
    }
})
const User=mongoose.model('User',Schema);
module.exports=User;