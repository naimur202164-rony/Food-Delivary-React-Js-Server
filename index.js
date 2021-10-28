const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const { MongoClient } = require('mongodb');


app.use(cors());
app.use(express.json());
// Conection Link
const uri = "mongodb+srv://mydbuser1:XSzJ1yYpwViGky5X@cluster0.tlrw7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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
        // Getting Data From Server||Get
        app.get('/delivaryfoods', async (req, res) => {
            const result = await LoadingCollectionfoods.find({}).toArray();
            console.log(result);
            res.send(result)
        })




    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);




app.listen(port, (req, res) => {
    console.log('server is runnnin on port', port)
})

