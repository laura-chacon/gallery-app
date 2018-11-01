import React, { Component } from 'react';
import styled from 'styled-components';
import Photo from "./Photo/index.js"

const PhotosContainer = styled.div`
    flex: 1,
`;

const url = 'https://api.flickr.com/services/rest/';

export default class Gallery extends Component {

  constructor(){
        super();
        this.state = {
            photos: [],
        };
    }

    componentDidMount() {
      fetch(url+'?method=flickr.photos.search&api_key='+process.env.FLICKR_API_KEY+'&tags=nyc&per_page=5&page=1&format=json&nojsoncallback=1')
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonResponse) {
            let picArray = jsonResponse.photos.photo.map((pic) => {
                return({
                    title: pic.title,
                    owner: pic.owner,
                    imageUrl: 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg'
                })
            });
            this.setState({photos: picArray});
        }.bind(this));
    }

    render() {
        let {photos} = this.state;
        return (
            <div>
                <h1>Gallery</h1>
                <PhotosContainer>
                    {photos.map((photo) => {
                        return (
                            <Photo photo={photo}/>
                        );
                    })}
                </PhotosContainer>
            </div>
        );
    }
}
