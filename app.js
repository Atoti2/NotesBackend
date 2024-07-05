const notesRouter = require('./controllers/notes')
const config = require('./utils/config')
const logger = require('./utils/logger')
require("dotenv").config();

const express = require("express");
const app = express();
const middleware = require('./utils/middleware')
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require('mongoose')

morgan.token("body", (req) => {
    return JSON.stringify(req.body);
});

mongoose.set('strictQuery', false)
logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

app.use(express.static("dist"));
app.use(express.json());
app.use(morgan(":method :url - :total-time ms :body "));
app.use(cors());

app.use('/api/notes', notesRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
