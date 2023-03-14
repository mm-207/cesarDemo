import express from 'express'
const { createHmac } = await import('node:crypto');
import { encrypt,decrypt } from '../modules/chipher.mjs';
import StorageManager from '../modules/storageManager.mjs';
import apiEndpoints from '../public/js/apiEndpoints.mjs';

const {API_ENDPOINTS, USER_ENDPOINT}  = apiEndpoints;

let settings = await import("../NEI.json", { assert: { type: "json" } });
settings = settings["default"];
const connectionString = process.env.DATABASE_URL || settings.DATABASE_URL;

let secret = Math.random().toString(32).substring(2);
if(process.env.debug ){ // For å ungå å måtte lage nye tokens hver gang vi tester :)
    secret = process.env["CRYPTO_SEECRET"] ||  settings.CRYPTO_SEECRET;
}

const salt = process.env["SALT"] || settings.SALT

const userAPIRoute = express.Router();

userAPIRoute.use(express.json());

userAPIRoute.put("/resetAllLogins",function(req,res,next){
    secret = Math.random().toString(32).substring(2);
})

userAPIRoute.post("/create", async function(req,res,next){
    
    const email = req.body.email.toLowerCase();
    try {
        const id = await (new StorageManager(connectionString)).createUser(email);
        const hash = createHmac('sha256', salt)
                .update(`${id}/${secret}/${email}`)
                .digest('hex');
        res.json({hash}).end();
        
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"Bad stuff happend"});
    }
    

    next();
})

userAPIRoute.get("/authenticate/:userHash/:email", async function(req,res,next){
    
    const email = req.params.email.toLowerCase();
    const userProvidedHash = req.params.userHash;

    try {
        const userData = await (new StorageManager(connectionString)).retrieveUser(email);
        const hash = createHmac('sha256', salt)
                .update(`${userData.id}/${secret}/${email}`)
                .digest('hex');

        if(hash === userProvidedHash){
            // OK autentiser   
            res.set("auth-token", hash);
            res.set("user", email);
            res.json({hash}).end();
        }
        else{
            res.status(404).json({error:"no user with that info"})
        }
        
        
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"Bad stuff happend"});
    }
    

    next();
})

export default userAPIRoute;