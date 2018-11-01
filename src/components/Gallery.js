import React, { Component } from 'react';
import styled from 'styled-components';
import Photo from './Photo';

const PhotosContainer = styled.div`
    flex: 1,
`;

export default class Gallery extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
    };
  }

  componentDidMount() {
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.FLICKR_API_KEY}&tags=nyc&per_page=5&page=1&format=json&nojsoncallback=1`;
    fetch(url)
      .then(response => response.json())
      .then((jsonResponse) => {
        const picArray = jsonResponse.photos.photo.map(pic => ({
          title: pic.title,
          owner: pic.owner,
          imageUrl: `https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`,
        }));
        this.setState({ photos: picArray });
      })
      .bind(this);
  }

  render() {
    const { photos } = this.state;
    return (
      <div>
        <h1>Gallery</h1>
        <PhotosContainer>
          {photos.map(photo => <Photo photo={photo} key={photo.title} />)}
        </PhotosContainer>
      </div>
    );
  }
}
