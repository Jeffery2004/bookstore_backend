const express=require('express');
const app=express();
const mongoose=require('mongoose');
const User=require('./userModel.js');
const Register=require('./registerModel.js');
app.use(express.json());
//get all books
app.get('/',async(req,res)=>{
    await User.find({})
    .then((user)=>{
        res.json(user)
    })
    .catch((err)=>{
        console.log(err);
    })
})
//post a book
app.post('/',async(req,res)=>{
    const data={isbn:req.body.isbn,author:req.body.author,title:req.body.title,reviews:req.body.reviews}
    await User.create(data)
    .then((user)=>{
        res.json(user);
    })
    .catch((err)=>{
        console.log(err);
    })
})
//get a book by isbn
app.get('/isbn/:isbn',async(req,res)=>{
    const isbn=req.params.isbn;
    await User.findOne({isbn:isbn})
    .then((user)=>{
        res.json(user);
    })
    .catch((err)=>{
        console.log(err);
    })
})
//get books by author
app.get('/author/:author',async(req,res)=>{
    const author=req.params;
    await User.find(author)
    .then((user)=>{
        res.json(user);
    })
    .catch((err)=>{
        console.log(err);
    })
})
//get book by title
app.get('/title/:title',async(req,res)=>{
    const title=req.params.title;
    await User.find({title:title})
    .then((user)=>{
        res.json(user);
    })
    .catch((err)=>{
        console.log(err);
    })
})
//get a review by isbn
app.get('/review/:isbn',async(req,res)=>{
    const isbn=req.params.isbn;
    await User.findOne({isbn:isbn})
    .then((user)=>{
        res.json({reviews:user.reviews});
    })
    .catch((err)=>{
        console.log(err);
    })
})
//register a new user
app.post('/register',async(req,res)=>{
    const data={username:req.body.username,password:req.body.password};
    const username=req.body.username;
    const user=await Register.findOne({username:username})
    console.log(user);
    if(!user){
        await Register.create(data)
        .then((result)=>{
            res.json({message:"Customer successfully registerd. Now you can login"})
        })
        .catch((err)=>{
            console.log(err);
        })
    }else{
        res.send('Already registered');
    }

})
//login a user
app.post('/login',async(req,res)=>{
    const data={username:req.body.username,password:req.body.password};
    await Register.find({username:data.username})
    .then((user)=>{
        res.send('Customer Successfully logged in');
    })
    .catch((err)=>{
        console.log(err);
    })
})
//update the review
app.put('/update/:isbn',async(req,res)=>{
    const isbn=req.params.isbn;
    const review=req.body.reviews;
    await User.findOneAndUpdate({isbn:isbn},{reviews:review})
    .then((user)=>{
        res.send(`The review for book with ISBN ${isbn} has been added/updated`);
    })
    .catch((err)=>{
        console.log(err);
    })
})
//delete the review
app.delete('/review/:isbn',async(req,res)=>{
    const isbn=req.params.isbn;
    const review=req.body.reviews;
    await User.findOneAndUpdate({isbn:isbn},{reviews:review})
    .then((user)=>{
        const name=user.author
        res.send(`Review for ISBN ${isbn} posted by ${name} deleted`);
    })
    .catch((err)=>{
        console.log(err);
    })
})
mongoose.connect('mongodb://localhost:27017/test')
.then(()=>{
    app.listen(3000,()=>{
        console.log('listening')
    })
})
.catch((err)=>{
    console.log(err);
})