import React, { Component } from 'react';
import styled from 'styled-components';
import Columns from 'react-columns';
import Photo from './Photo';

const PhotosContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default class Gallery extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
    };
  }

  componentDidMount() {
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.FLICKR_API_KEY}&tags=nyc&per_page=20&page=1&format=json&content_type=1&nojsoncallback=1&extras=count_comments,count_faves,url_o&sort=interestingness-desc&extras=url_o`;
    fetch(url)
      .then(response => response.json())
      .then((jsonResponse) => {
        console.log('jsonResponse',jsonResponse)
        const picArray = jsonResponse.photos.photo.map(pic => ({
          title: pic.title,
          owner: pic.owner,
          id: pic.id,
          imageUrl: pic.url_o,
        }));
        this.setState({ photos: picArray });
      })
      .catch(error => console.error(error));
  }

  render() {
    const { photos } = this.state;
    const queries = [{
      columns: 1,
      query: 'min-width: 200px',
    }, {
      columns: 2,
      query: 'min-width: 500px',
    }];
    return (
      <div>
        <h1>Gallery</h1>
        <PhotosContainer>
          <Columns queries={queries}>
            {photos.map(photo => <Photo photo={photo} key={photo.id} />)}
          </Columns>
        </PhotosContainer>
      </div>
    );
  }
}
