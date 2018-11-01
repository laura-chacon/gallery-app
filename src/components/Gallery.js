import React, { Component } from 'react';

export default class Gallery extends Component {

  constructor(){
        super();
        this.state = {
            images: [],
        };
    }

    componentDidMount() {
      fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='+process.env.FLICKR_API_KEY+'&tags=nyc&per_page=10&page=1&format=json&nojsoncallback=1')
        .then(function(response){
            return response.json();
        })
        .then(function(jsonResponse){
            let picArray = jsonResponse.photos.photo.map((pic) => {
                return({
                    title: pic.title,
                    owner: pic.owner,
                    imageUrl: 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg'
                })
            })
            this.setState({images: picArray});
        }.bind(this));
    }

    render() {
        return (
            <div>
                <h1>Gallery</h1>
            </div>
        );
    }
}
