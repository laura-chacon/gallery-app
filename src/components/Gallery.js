import React, { Component } from 'react';

export default class Gallery extends Component {

  constructor(){
        super();
        this.state = {
            images: [],
        };
    }

    componentDidMount() {
      console.log('process.env.FLICKR_API_KEY', process.env.FLICKR_API_KEY)
      fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='+process.env.FLICKR_API_KEY+'&tags=nyc&per_page=10&page=1&format=json&nojsoncallback=1')
        .then(function(response){
            return response.json();
        })
        .then(function(jsonResponse){
            console.log('jsonResponse', JSON.stringify(jsonResponse))
        })
    }

    render() {
        return (
            <div>
                <h1>Gallery</h1>
            </div>
        );
    }
}
