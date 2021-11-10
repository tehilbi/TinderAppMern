import express from 'express';
import mongoose from 'mongoose';
import Cards from './dbCards.js';
import Cors from 'cors';

//App Config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = `mongodb+srv://admin:david20@cluster0.14g8r.mongodb.net/tinderdb?retryWrites=true&w=majority`;

//Middleware
app.use(express.json());
app.use(Cors());

//DB config
mongoose.connect(connection_url);

//API Endpoints
app.get('/', (req, res) => {
    res.status(200).send('HELLO CLEVER PROGRAMMERS!!!');
});

app.post('/tinder/card', (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

app.get('/tinder/card', (req, res) => {
    Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

//Listeners
app.listen(port, () => console.log(`listening on localhost ${port}`));
