const { configureStore } = require("@reduxjs/toolkit");
const { createLogger } = require('redux-logger'); 
const videoReducer = require('../videos/videosSlice')
const logger = createLogger();


const store = configureStore({
    reducer: {
        videos : videoReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

module.exports = store;