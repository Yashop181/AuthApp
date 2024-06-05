const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async(req,res)=>{
    const {username ,password} = req.body;
    try
    {
        let user = await User.findOne({username});
        if(user)
            {
                return res.status(400).json({msg: 'User already exists'});
            }
            user = new User({username, password});
            await user.save();

            const payload = {user: {id: user.id}};
            jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'},(err,token)=>{
                if(err) throw err;
                res.json({token});
            })
    }catch(error)
    {
        res.status(500).send('Server error');
    }
};

exports.login = async( req,res)=>{
    const {username,password} = req.body;
    try
    {
        const user = await User.findOne({username});
        if(!user)
            {
                return res.status(400).json({msg:'Invalid credentials: User not found' });
            }
            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch)
                {
                    return res.status(400).json({ msg: 'Invalid credentials: Incorrect password' });
                }
        const payload = {user : {id: user.id} };
        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'},(err,token)=>{
            if(err) throw err;
            res.json({token});
        });
    }
    catch(error)
    {
        res.status(500).send('Server error');
    }
};

exports.logout = (req,res)=>{
    res.json({ msg: 'User logged out' });
};