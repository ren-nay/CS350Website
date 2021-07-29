/*
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err){
      throw err;
  }
  var dbo = db.db("mydb");
  dbo.createCollection("customers", function(err, res) {
    if (err){
        throw err;
    }
    console.log("Collection created!");
    db.close();
  });
});
*/
const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://rdav:XmzffORuONFY2oey@cluster0.a3dbe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri);
/*
async function run() {
  try {
    await client.connect();

    const database = client.db('sample_mflix');
    const movies = database.collection('movies');

    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Blacksmith Scene' };
    const movie = await movies.findOne(query);

    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
*/

async function run() {
    try {
        await client.connect();
        const database = client.db("cs350Website");
        const feedback = database.collection("userFeedback");
        // create a document to be inserted
        const doc = { name: "tester two", address: "van down by the river", phone: "654-654-5865", email: "garbage@garbage.com", rating: "1", comment: "get good" };
        const result = await feedback.insertOne(doc);
        console.log(
        `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
        );
    } finally {
        await client.close();
    }
}


run().catch(console.dir);

