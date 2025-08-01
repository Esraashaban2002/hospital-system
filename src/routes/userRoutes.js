const express = require('express')
const User = require('../models/User')
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/');
const router = express.Router()
const auth = authMiddleware.auth
 
 
router.post('/register' , async (req , res)=>{
    try{
    const user = new User (req.body)
    await user.save()
        res.status(200).send(user)
    }
    catch (e){
         res.status(400).send(e)}
})

router.post('/login' , async(req , res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)

        const deviceInfo = req.headers['user-agent'] || 'Unknown Device';
        const accessToken  = await user.generateToken(deviceInfo);

        res.status(200).send({ user, accessToken , role : user.role })
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

router.post('/reset-password' , async(req , res)=>{
    try{
        const {email , newPassword} =req.body
        const user = await User.findOne({email})
        if (!user) return res.status(404).send('User not found')
        user.password = newPassword
        await user.save()
        res.send({ message: 'Password reset successfully' })
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

router.delete('/logout', auth, async (req, res) => {
    try {
     req.user.tokens = req.user.tokens.filter(el => el.token !== req.token);
  
      await req.user.save();
      res.send({ message: 'Logged out from this session.' });
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  });
  
 router.delete('/logoutAll', auth, async (req, res) => {
    try {
     req.user.tokens = [];
      await req.user.save();
      res.send({ message: 'Logged out from all sessions.' });
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  });
   

module.exports = router 