const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")
const fetch = require('node-fetch')

const initialState = {
    loading: false,
    videos: [],
    error: ''
}

const asyncFetchVideo = createAsyncThunk('videos/fetchAsync', async () => {
    const res = await fetch('http://localhost:9000/videos');
    const videos = await res.json();
    return videos;
})
const asyncFetchVideoByQuery = createAsyncThunk('videos/queryFetchAsync', async (url) => {
    const res = await fetch(url);
    const videos = await res.json();
    return videos;
})

const videoSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(asyncFetchVideo.pending, (state, action) => {
            state.loading = true,
            state.videos = [],
            state.error = ''
        })
        
        builder.addCase(asyncFetchVideo.fulfilled, (state, action) => {
            state.loading = false,
            state.videos = action.payload,
            state.error = ''
        })
        
        builder.addCase(asyncFetchVideo.rejected, (state, action) => {
            state.loading = false,
            state.videos = [],
            state.error = action.error.message
        })

        // with query
        builder.addCase(asyncFetchVideoByQuery.pending, (state, action) => {
            state.loading = true,
            state.videos = [],
            state.error = ''
        })
        
        builder.addCase(asyncFetchVideoByQuery.fulfilled, (state, action) => {
            state.loading = false,
            state.videos = action.payload,
            state.error = ''
        })
        
        builder.addCase(asyncFetchVideoByQuery.rejected, (state, action) => {
            state.loading = false,
            state.videos = [],
            state.error = action.error.message
        })
    }
})

module.exports = videoSlice.reducer;
module.exports.asyncFetchVideo = asyncFetchVideo;


module.exports.asyncFetchVideoByQuery = asyncFetchVideoByQuery;
