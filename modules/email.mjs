import fetch from "node-fetch"

let settings = await import("../NEI.json", { assert: { type: "json" } });
settings = settings["default"];

const API_KEY = process.env['MAILGUN_API_KEY'] || settings.MAILGUN_API_KEY


const DOMAIN = process.env['MAILGUN_DOMAIN'] || settings.MAILGUN_DOMAIN;
const API_URL = `https://api:${API_KEY}@api.mailgun.net/v2/${DOMAIN}`;

async function sendEmail(msg , to){
    const config = {
        method: "POST", 
                headers: {
                  "Content-Type": "application/json",
                },
        body:{from : "ev@example.com",
        to,
        subject : "Secure login",
        text : msg,
        html : msg}
    }
    await fetch( API_URL+"/messages", config);

}
    
export default sendEmail;
