const router = require("express").Router();
const {authtoken} = require("./userauth")
const Book = require("../models/book")
const Order = require("../models/order")
const User = require("../models/user");

//place order
router.post("/place-order",authtoken,async(req,res)=>{
    try {
        const {id} = req.headers;
        const {order} = req.body;
        for(const orderData of order){
            const newOrder = new Order({user:id,book:orderData._id});
            const orderDatafromDb = await newOrder.save();
            //saving order in user model
            await User.findByIdAndUpdate(id,{$push:{orders:orderDatafromDb._id},});
            //clearing cart
            await User.findByIdAndUpdate(id,{$pull:{cart:orderData._id},})
        }
        return res.json({
            status:"Success",
            message:"Order placed",
        })
    } catch (error) {
        res.status(500).json({message:"Internal server Error"})
    }
})

//get order history of perticular user
router.get("/get-orderhis-user",authtoken,async(req,res)=>{
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate({
            path:"orders",
            populate: {path:"book"},
        });
        const orderData = userData.orders.reverse();
        return res.json({
            status:"Success",
            data:orderData,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
});

//get all orders
router.get("/get-all-order",authtoken,async(req,res)=>{
    try {
        const userData = await Order.find().populate({
            path:"book",
        })
        .populate({
            path:"user",
        })
        .sort({createdAt:-1});
        return res.json({
            status:"Success",
            data:userData,
        })
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})

//update order --admin
router.put("/update-status/:id",authtoken,async(req,res)=>{
    try {
        const {id} = req.params;
        await Order.findByIdAndUpdate(id,{status:req.body.status});
        return res.json({
            status:"Success",
            message:"Status updated sucessfully",
        })
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})
module.exports = router; 