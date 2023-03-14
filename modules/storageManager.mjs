import * as pg from "pg"
const {Client} = pg.default



class StorageManager{

    static #instance;
    #credentials;

    constructor(credentials){
        if(!StorageManager.#instance){
            console.log(Client);
            StorageManager.#instance = this;
                this.#credentials = {
                    connectionString: credentials,
                    ssl: {
                        rejectUnauthorized: false 
                    }
                };
            
        }

        return StorageManager.#instance;
    }

    async createUser(email) {
        const client = new Client(this.#credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('INSERT INTO "public"."users"("email") VALUES($1) RETURNING "id"', [email]);
            results = results.rows[0].id
            client.end();
        } catch (err) {
            results = err;
        } finally{
            client.end();
        }

        return results; 
   }
   async retrieveUser(email) {
    const client = new Client(this.#credentials);
    let results = null;
    try {
        await client.connect();
        results = await client.query('SELECT * from "users" where email=$1', [email]);
        results = results.rows[0];
        client.end();
    } catch (err) {
        client.end();
        results = err;
    }

    return results;
}

    async saveSecret(secretMessage) {
        const client = new Client(this.#credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('INSERT INTO "public"."messages"("message") VALUES($1) RETURNING "id"', [secretMessage]);
            results = results.rows[0].id
            client.end();
        } catch (err) {
            results = err;
        } finally{
            client.end();
        }

        return results; 
   }

   
    async retrieveSecret(secretId) {
        const client = new Client(this.#credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('SELECT message from "messages" where id=$1', [secretId]);
            results = results.rows[0].message;
            client.end();
        } catch (err) {
            client.end();
            results = err;
        }

        return results;
    }



}


export default StorageManager;