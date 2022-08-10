const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const orderCollection = client.db('geniusCarService').collection('order')

        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });

        app.get('/service/:id', async(req, res) =>{
            const id = req.params.id;
            const query = {_id : ObjectId(id)};
            const service = await serviceCollection.findOne(query);
            res.send(service);
        });

        // post
        app.post('/service', async(req, res) =>{
            const newService = req.body;
            const result = await serviceCollection.insertOne(newService);
            res.send(result);
        });

        // delete
        app.delete('/service/:id', async(req, res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await serviceCollection.deleteOne(query)
            res.send(result)
        });

        // post order api
        app.post('/order', async(req, res) =>{
            const newOrder = req.body;
            const result = await orderCollection.insertOne(newOrder)
            res.send(result)
        });

        // get order api
        app.get('/order', async(req, res) =>{
            const query = {};
            const cursor = orderCollection.find(query);
            const order = await cursor.toArray()
            res.send(order)
        })
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
