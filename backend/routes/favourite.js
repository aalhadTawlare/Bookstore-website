const router = require("express").Router();
const User = require("../models/user");
const {authtoken} = require("./userauth")

//add book to fav
router.put("/addbook-fav",authtoken,async(req,res)=>{
    try {
        const {bookid,id} = req.headers;
        const userData = await User.findById(id);
        const isBookfav = userData.favourites.includes(bookid);
        if(isBookfav){
            return res.status(200).json({message:"Book is already in fav"})
        }
        await User.findByIdAndUpdate(id,{$push:{favourites:bookid}});
        return res.status(200).json({message:"Book is added in fav"})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }

})

//delete book from fav
router.put("/removebook-fav",authtoken,async(req,res)=>{
    try {
        const {bookid,id} = req.headers;
        const userData = await User.findById(id);
        const isBookfav = userData.favourites.includes(bookid);
        if(isBookfav){
            await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}});
        }
        return res.status(200).json({message:"Book is removed from fav"})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }

})

//get favourite book from perticular user
router.get("/getbook-fav",authtoken,async(req,res)=>{
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate('favourites');
        const favbooks = userData.favourites;
        return res.json({
            status: "Success",
            data: favbooks,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }

})
module.exports = router;