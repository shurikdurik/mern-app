const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))

const PORT = config.get('port') || 8000;

async function start() {
    mongoose.set('strictQuery', true)
    try {
        await mongoose.connect(config.get('mongoUri'));
        app.listen(PORT, () => console.log('App running'));
    } catch (error) {
        console.log('Server error: ', error.message);
        process.exit(1)
    }
}

start()

