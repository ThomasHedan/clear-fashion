const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const {MongoClient, ObjectId} = require('mongodb');


const MONGODB_URI = 'mongodb+srv://thomas:BoAyDxfDF5Z1r2Ha@cluster0.nuqs4kr.mongodb.net/?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'clearfashion';



const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());


// get search (ex : http://localhost:8092/products/search?limit=10&brand=Dedicated&price=50 )

async function getSearch(MONGODB_URI,brand,limit,price){
  const client = await MongoClient.connect(MONGODB_URI, {useNewUrlParser: true});
  const db = await client.db(MONGODB_DB_NAME);
  
  const collection = db.collection('products');
  filters = {}

  if(brand!=undefined){
    filters.brand = brand;
  }

  if(price!=undefined){
    filters.price = { $lte : parseInt(price)};
  }
  
  limit = parseInt(limit);
  
  console.log('searching with filters = ',filters);
  const result = await collection.find(filters).limit(limit).toArray();
  
  console.log(result);
  await client.close();
  return result;
  
}


// get product by id

async function getProductById(MONGODB_URI,id){
  const client = await MongoClient.connect(MONGODB_URI, {useNewUrlParser: true});
  const db = await client.db(MONGODB_DB_NAME);

  const collection = db.collection('products');
  const result = await collection.find({"_id":ObjectId(id)}).toArray();
  console.log(result);
  await client.close();
  return result;
  
}


// get products

async function getProducts(MONGODB_URI){
  const client = await MongoClient.connect(MONGODB_URI, {useNewUrlParser: true});
  const db = await client.db(MONGODB_DB_NAME);

  const collection = db.collection('products');
  console.log(collection);
  await client.close();
  return collection;
  
}

app.get('/products/search', async (request, response) => {
  console.log(request.query);
  const brand = request.query.brand || undefined;
  const price = request.query.price|| undefined;
  const limit = request.query.limit || '12';
  var res = await getSearch(MONGODB_URI,brand,limit,price);
  response.send(res);
});


app.get('/products/:id', async (request, response) => {
  const id = request.params.id;
  var res = await getProductById(MONGODB_URI,id);
  response.send(res);
});

app.get('/products', async (request, response) => {
  console.log(request.query);
  var res = await getProducts(MONGODB_URI);
  response.send(res);
});

app.listen(process.env.PORT || 8092, () => console.log(`Server started on port ${process.env.PORT || 8092}`));

console.log(`📡 Running on port ${PORT}`);
