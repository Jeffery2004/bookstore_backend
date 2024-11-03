const mongoose=require('mongoose');
const schema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const Register=mongoose.model('Register',schema);
module.exports=Register;