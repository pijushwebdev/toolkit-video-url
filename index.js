const store = require("./redux/store");
const { asyncFetchVideo, asyncFetchVideoByQuery } = require("./videos/videosSlice");

const uiShowVideos = async () => {

    await store.dispatch(asyncFetchVideo());

    const state = store.getState();

    const tags = state.videos.videos.tags;
    

    const urlParams = tags.map(tag => `tags_like=${tag}`).join('&');
    const url = `http://localhost:9000/videos?${urlParams}`


    await store.dispatch(asyncFetchVideoByQuery(url));

}
uiShowVideos()