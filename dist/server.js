import express from 'express';
import connectDB from './connection/db.js';
import morgan from 'morgan';
var app = express();
import routes from './routes/api/index.js';
connectDB();
app.use(express.json());
app.use(morgan('dev'));
// app.get(`/`, (req, res) => res.send('FuelOCR API running...'))
app.use(routes);
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () { return console.log("Server listening on port " + PORT); });
