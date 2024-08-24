import User from "../models/user.model.js";
import bcrypt from "bcryptjs/dist/bcrypt.js"; 
import generateTokenAndSetCookie from "../utils/generateToken.js";
export const Signup = async (req, res) => {
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body;
        console.log('signup working');

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Password doesn't match, please check your password." });
        }

        // Check if the username already exists
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "User is already present." });
        }

        //TODO: HASHED PASSWORD

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        // Set default profile picture based on gender
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`; // Corrected "girld" to "girl"

        // Create a new user
        const newUser = new User({
            fullname,
            username,
            password:hashedPassword, 
            
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        });
        
        // Save the user to the database
        if (newUser) {
          
        // TODO:  Generate JWT token   

        await newUser.save();
        generateTokenAndSetCookie(newUser._id,res);

        // Respond with the created user details (excluding the password)
        res.status(201).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            profilePic: newUser.profilePic,
        });
    }else
    {
        res.send('Invalid user data');
    }
    } catch (error) {
        console.log('Error in signup user:', error);
        res.status(500).json({ error: "Internal Server Error" });  // Corrected status code to 500
    }
};

export const Login = async (req, res) => {
    try {
        const { username, password } = req.body;
 
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: "Invalid Username or Password" });
        }

        // Check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user?.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid Username or Password" });
        }

        // Generate token and set it in cookies
        generateTokenAndSetCookie(user._id, res);

        // Respond with the user details (excluding the password)
        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilePic: user.profilePic,
        });

        console.log('Login successful');
    } catch (error) {
        console.log('Error during user login:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const Logout =async (req,res)=>
{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"User logout successfully"});
    } catch (error) {
        console.log('Error during user logout:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}