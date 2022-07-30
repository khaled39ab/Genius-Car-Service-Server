const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectID } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.exvps.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const serviceCollection = client.db('geniusCarService').collection('service');

        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services)
        });

        
    }
    finally {

    }
}

run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Server is running')
});

app.listen(port, () => {
    console.log('Port is listening');
})
