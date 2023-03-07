import express from 'express'
import API_ENDPOINTS from "../public/js/apiEndpoints.mjs";


const encryptionAPIRoute = express.Router();

encryptionAPIRoute.use(express.json());

encryptionAPIRoute.post(API_ENDPOINTS.encrypt.endpoint, function(req,res,next){
    res.json(req.body).end();
    next();
})

encryptionAPIRoute.post(API_ENDPOINTS.decrypt.endpoint, function(req,res,next){
    res.json(req.body).end();
    next();
})

export default encryptionAPIRoute