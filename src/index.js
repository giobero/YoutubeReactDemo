import React, { Component } from 'react';
import ReactDom from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyBrUCiUIm8lmJJNY4qUZn8BSWelnqAU4-E';

class App extends Component {

    constructor(params) {
        super(params)
        this.state = {
            videos: [],
            selectedVideo: null
        };

    }

    render() {

        const searchVideo = _.debounce( term => {this.searchVideo(term)}, 300)

        return (
            <div>
                <SearchBar onSearchTermChange={term => searchVideo(term)} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList 
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos} />
            </div>
        );
    }

    searchVideo(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            })
        });
    }
};

ReactDom.render(<App />, document.querySelector('.container'));
