const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const user = require("../models/user");
const jwt = require("jsonwebtoken")
const {authtoken} = require("./userauth")

// SignUp
router.post("/signup", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        // Check username length
        if (username.length < 4) {
            return res.status(400).json({ message: "Username length should be greater than 4 characters" });
        }

        // Check if username already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Check if email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Check password length
        if (password.length <= 5) {
            return res.status(400).json({ message: "Password length should be greater than 5 characters" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            username:username,
            email:email,
            password: hashedPassword,
            address:address,
        });

        await newUser.save();
        return res.status(201).json({ message: "Signup successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

//SignIn
router.post("/signin",async(req,res)=>{
try {
    const {username,password} = req.body;
    const existingUsername = await user.findOne({username});
    if(!existingUsername)
        {
            res.status(400).json({message:"Invalid Credentials"});
        }
    await bcrypt.compare(password,existingUsername.password,(err,data)=>{
        if(data){
            const authClaims = [{name:existingUsername.username},{role:existingUsername.role},];
            const token = jwt.sign({authClaims},"bookStore123",{expiresIn:"30d",});
            res.status(200).json({id:existingUsername._id,
                role:existingUsername.role,
                token:token});
        }
        else{
            res.status(400).json({message:"Invalid Credentials"});
        }

    });    
} catch (error) {
    res.status(500).json({message:"Internal server error"});
}
});

//getuserinfo
router.get("/get-user-info",authtoken,async(req,res)=>{
    try {
        const {id} = req.headers;
        const data = await User.findById(id).select("-password");
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})

//update address
router.put("/update-address",authtoken,async(req,res)=>{
    try {
        const {id} = req.headers;
        const {address} =req.body;
        await User.findByIdAndUpdate(id,{address})
        return res.status(200).json({message:"Address updated successfully"})
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
})
module.exports = router;
