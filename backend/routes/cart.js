const router = require("express").Router();
const User = require("../models/user");
const {authtoken} = require("./userauth")

//add to cart
router.put("/addbook-cart",authtoken,async(req,res)=>{
    try {
        const {bookid,id} = req.headers;
        const userData = await User.findById(id);
        const isBookcart = userData.cart.includes(bookid);
        if(isBookcart){
            return res.json({
                status:"Success",
                message:"Book is already in Cart",
            });
        }
        await User.findByIdAndUpdate(id,{$push:{cart:bookid}},);
        return res.json({
            status:"Success",
            message:"Book is added in Cart",
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }

});

//remove from cart
router.put("/removebook-cart/:bookid",authtoken,async(req,res)=>{
    try {
        const {bookid} = req.params;
        const {id} = req.headers;
        const userData = await User.findById(id);
        const isBookcart = userData.cart.includes(bookid);
        if(isBookcart){
            await User.findByIdAndUpdate(id,{$pull:{cart:bookid}});
        }
        return res.status(200).json({message:"Book is removed from Cart"})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }

})

//get cart of perticular user
router.get("/getbook-cart",authtoken,async(req,res)=>{
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate("cart");
        const cartbooks = userData.cart.reverse();
        return res.json({
            status: "Success",
            data: cartbooks,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }

})
module.exports = router;