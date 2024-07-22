const router = require("express").Router();
const User = require("../models/user");
const user = require("../models/user");
const jwt = require("jsonwebtoken")
const Book = require("../models/book")
const {authtoken} = require("./userauth")

//add book admin
router.post("/addbook",authtoken,async(req,res)=>{
    try {
        const {id} = req.headers;
        const user = await User.findById(id);
        if(user.role !== "admin")
            {
                res.status(400).json({message:"You not have an access to perform the admin"});
            }
        const book = new Book({
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language,
        })
        await book.save();
        res.status(200).json({message:"Book is added successfully"})
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
});
//update book
router.put("/updatebook",authtoken,async(req,res)=>{
    try {
        const {bookid} = req.headers;
        // const user = await User.findById(id);
        // if(user.role !== "admin")
        //     {
        //         res.status(400).json({message:"You not have an access to perform the admin"});
        //     }
        await Book.findByIdAndUpdate(bookid,{
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language,
        })
        res.status(200).json({message:"Book is updated successfully"})
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
})
//delete book
router.delete("/deletebook",authtoken,async(req,res)=>{
    try {
        const {bookid} = req.headers;
        await Book.findByIdAndDelete(bookid)
        res.status(200).json({message:"Book is deleted successfully"})
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
})
//get all books
router.get("/get-all-books",async(req,res)=>{
    try {
        const books = await Book.find().sort({createdAt: -1});
        return res.json({
            status:"Success",
            data: books,
        })
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
})
//get recent book
router.get("/get-recent-book",async(req,res)=>{
    try {
        const books = await Book.find().sort({createdAt: -1}).limit(4);
        return res.json({
            status:"Success",
            data: books,
        })
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
})
//getbook by id
router.get("/get-bookbyid/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        return res.json({
            status:"Success",
            data:book,
        })
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
})
module.exports = router;

