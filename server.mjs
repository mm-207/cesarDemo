import express from 'express'
import API_ENDPOINTS from './public/js/apiEndpoints.mjs';
import encryptionAPIRoute from './routes/encryptionAPI.mjs';

const server = express();
const port = (process.env.PORT || 8080);

server.set('port', port);
server.use(express.static('public'));

server.use((req,res,next)=>{
    console.log(req.url);
    next();
})

server.use(express.json());

server.use(API_ENDPOINTS.base,encryptionAPIRoute);


server.listen(server.get('port'), function () {
console.log('server running', server.get('port'));
});