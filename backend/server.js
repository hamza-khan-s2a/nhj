
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import data from './data.js';
import config from './config.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js'
import path from "path"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// mongoose.connect(config.MONGODB_URL).then(() => {
//   console.log('Connected to mongodb')
// }).catch((err) => console.error(`not connected ${err}`))

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGODB_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use('/api/users', userRouter)
app.use('/api/order', orderRouter)


// app.use(express.static(path.join(__dirname, "/frontend/build")));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/frontend/build', 'index.html'));
// });
app.get('/api/products', (req, res) => {
  res.send(data.products);
});

app.get('/api/products/:id', (req, res) => {

  const product = data.products.find((x) => x.id === (req.params.id));
  if (product) {
    res.send(product)
  } else {
    res.status(404).send({ message: 'Product not found' })
  }
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.name && err.name === "ValidationError" ? 400 : 500;

  res.status(status).send({ message: err.message })
})


// zaryab there is a problem in this code block

app.use(express.static(path.join(__dirname, "../frontend")));
app.use('../frontend', express.static(path.join(__dirname + '../frontend')));

// app.get('/server', (req, res) => {
//   res.sendFile("hello from server");
// });
app.get('/server', (req, res) => {

  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));

});

// problem ended

// app.listen(process.env.PORT || 5000, () => {
//   console.log('server at http://localhost:5000');
// });

connectDB().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log("listening for requests at http://localhost:5000");
  })
})