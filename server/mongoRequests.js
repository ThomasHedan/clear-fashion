const {MongoClient} = require('mongodb');



const MONGODB_URI = 'mongodb+srv://thomas:BoAyDxfDF5Z1r2Ha@cluster0.nuqs4kr.mongodb.net/?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'clearfashion';

async function Request1(MONGODB_URI,brand){
    const client = await MongoClient.connect(MONGODB_URI, {useNewUrlParser: true});
    console.log('Connected to mongo DB');
    const db = await client.db(MONGODB_DB_NAME);
    const products = require('./products.json');
    const collection = db.collection('products');
    const result = await collection.find({brand}).toArray();
    console.log(result);
    await client.close();
    console.log('Disconnected of mongo DB')
}


//Request1(MONGODB_URI,'Dedicated');


async function Request2(MONGODB_URI,priceMax){
    const client = await MongoClient.connect(MONGODB_URI, {useNewUrlParser: true});
    console.log('Connected to mongo DB');
    const db = await client.db(MONGODB_DB_NAME);
    const collection = db.collection('products');
    var query = {price : {$lt :priceMax} }
    const result = await collection.find(query).toArray();
    console.log(result);
    await client.close();
    console.log('Disconnected of mongo DB')
}


//Request2(MONGODB_URI,50);

;

async function Request3(MONGODB_URI){
    const client = await MongoClient.connect(MONGODB_URI, {useNewUrlParser: true});
    console.log('Connected to mongo DB');
    const db = await client.db(MONGODB_DB_NAME);
    const collection = db.collection('products');
    const result = await collection.find().sort({price:1}).toArray();
    console.log(result);
    await client.close();
    console.log('Disconnected of mongo DB')
}


//Request3(MONGODB_URI);

async function Request4(MONGODB_URI){
    const client = await MongoClient.connect(MONGODB_URI, {useNewUrlParser: true});
    console.log('Connected to mongo DB');
    const db = await client.db(MONGODB_DB_NAME);
    const collection = db.collection('products');
    const result = await collection.find().sort({date:1}).toArray();
    console.log(result);
    await client.close();
    console.log('Disconnected of mongo DB')
}


//Request4(MONGODB_URI);

async function Request5(MONGODB_URI,priceMax){
    const client = await MongoClient.connect(MONGODB_URI, {useNewUrlParser: true});
    console.log('Connected to mongo DB');
    const db = await client.db(MONGODB_DB_NAME);
    const collection = db.collection('products');
    var x = new Date();
    x = x- 14*1000*60*60*24;
    var y = new Date(x);
    var z = y.toISOString();
    var query = {date : {$gt : z } };
    const result = await collection.find(query).toArray();
    console.log(result);
    await client.close();
    console.log('Disconnected of mongo DB')
}



Request5(MONGODB_URI);