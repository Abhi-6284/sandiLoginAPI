const express = require("express");
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    try {
        if (token){
            jwt.verify(token, process.env.JWT_SECRET_KEY, (err, valid)=>{
                if (err){
                    throw new Error("Please provide a valid token");
                }else{
                    next();
                }
            })
        }else{
            throw new Error("Please provide a token");
        }
    } catch (e) {return res.status(401).json({message: e.message})}
    // next();
}