const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const items = require('./routes/api/items');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;
mongoose
    .connect(db, {
        useNewUrlParser: true,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000
    })
    .then(() => console.log('mongoDB connected'))
    .catch(err => console.log(err));

app.use('/api/items', items);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5074;

app.listen(port, () => console.log(`server started on ${port}`));
