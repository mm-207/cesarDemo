import express from 'express'
import apiEndpoints from "../public/js/apiEndpoints.mjs";
import { encrypt,decrypt } from '../modules/chipher.mjs';
import StorageManager from '../modules/storageManager.mjs';

const {API_ENDPOINTS, USER_ENDPOINT}  = apiEndpoints;


const connectionString = process.env.DATABASE_URL;


const encryptionAPIRoute = express.Router();

encryptionAPIRoute.use(express.json());

encryptionAPIRoute.post(API_ENDPOINTS.encrypt.endpoint, async function(req,res,next){
    
    const msg = req.body.msg;
    const shift = req.body.shift;
    const chipherText = encrypt(msg,shift);
    
    const secretID = await (new StorageManager(connectionString)).saveSecret(chipherText);

    res.json({secretID}).end();

    next();
})

encryptionAPIRoute.post(`${API_ENDPOINTS.decrypt.endpoint}/:id`, async function(req,res,next){
    
    const secretID = req.params.id
    const shift = req.body.shift;

    const chipherText  = await (new StorageManager(connectionString)).retrieveSecret(secretID);
    const clearText = decrypt(chipherText,shift);

    res.json({clearText}).end();

    
    next();
})

export default encryptionAPIRoute