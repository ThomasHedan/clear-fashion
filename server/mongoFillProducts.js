const {MongoClient} = require('mongodb');



const MONGODB_URI = 'mongodb+srv://thomas:BoAyDxfDF5Z1r2Ha@cluster0.nuqs4kr.mongodb.net/?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'clearfashion';

async function Connect(MONGODB_URI){
    const client = await MongoClient.connect(MONGODB_URI, {useNewUrlParser: true});
    console.log('Connected to mongo DB');
    const db = await client.db(MONGODB_DB_NAME);
    const products = require('./products.json');
    const collection =  db.collection('products');
    const result = await collection.insertMany(products);
    console.log(result);
    await client.close();
    console.log('Disconnected of mongo DB')
}


Connect(MONGODB_URI);