const express = require('express');
const app = express();
const cors = require('cors');
const ObjectId = require("mongodb").ObjectId;
const MongoClient = require("mongodb").MongoClient;
const port = process.env.PORT || 5000;

require('dotenv').config()

app.use(cors());
app.use(express.json());
// Conection Link
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tlrw7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



app.get('/', (req, res) => {
    res.send('Wellcome')
});
// Server Router


async function run() {
    try {
        await client.connect();
        const database = client.db("DelivarFoods");
        const LoadingCollectionfoods = database.collection("insarted-foods");
        const collectionFoods = database.collection("orderd-foods");
        const UploadCollectionFoods = database.collection('AddFoods')
        // Getting Data From Server||Get
        app.get('/delivaryfoods', async (req, res) => {
            const result = await LoadingCollectionfoods.find({}).toArray();
            // console.log(result);
            res.send(result)
        });

        // Post Data

        app.post("/addProducts", async (req, res) => {
            const result = await collectionFoods.insertOne(req.body)
            // console.log(result)
            res.send(result);

        });
        // Get data Data from addProducts
        app.get('/OrderdDetails', async (req, res) => {
            const result = await collectionFoods.find({}).toArray();
            res.send(result)


        });


        //delete product from the database
        app.delete('/OrderdDetails/:id', async (req, res) => {


            const id = req.params.id;
            const result = await collectionFoods.deleteOne({ _id: ObjectId(id) });
            res.send(result)
            console.log(result
            )



        })
        // Upload New Products|| Post Itmes
        app.post('/uploadProducts', async (req, res) => {
            const addItmes = await UploadCollectionFoods.insertOne(req.body);
            res.send(addItmes);
            // console.log(addItmes)
        })
        // Geting Upload Products || GET
        app.get('/loadedProducts', async (req, res) => {
            const result = await UploadCollectionFoods.find({}).toArray();
            res.send(result);
            // console.log(result)
        })

    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);




app.listen(port, (req, res) => {
    console.log('server is runnnin on port', port)
})

