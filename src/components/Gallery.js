import React, { Component } from 'react';
import styled from 'styled-components';
import Columns from 'react-columns';
import Photo from './Photo';
import PhotoLightbox from './PhotoLightbox';

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
      ligthboxIsOpen: false,
      lightboxPhotoIndex: -1,
    };

    this.openLightBox = this.openLightBox.bind(this);
    this.closeLightBox = this.closeLightBox.bind(this);
  }

  componentDidMount() {
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.FLICKR_API_KEY}&tags=nyc&per_page=6&page=1&format=json&content_type=1&nojsoncallback=1&license=1,2,3,4,5,6,7,8,9,10&extras=count_comments,count_faves,url_z&sort=interestingness-desc`;
    fetch(url)
      .then(response => response.json())
      .then((jsonResponse) => {
        const picArray = jsonResponse.photos.photo.map(pic => ({
          title: pic.title,
          owner: pic.owner,
          id: pic.id,
          imageUrl: pic.url_z,
          count_comments: pic.count_comments,
          count_faves: pic.count_faves,
        }));
        this.setState({ photos: picArray });
      })
      .catch(error => console.error(error));
  }

  openLightBox(photoId) {
    const { photos } = this.state;
    const lightboxPhotoIndex = photos.findIndex(photo => photo.id === photoId);
    this.setState({
      ligthboxIsOpen: true,
      lightboxPhotoIndex,
    });
  }

  closeLightBox() {
    this.setState({
      ligthboxIsOpen: false,
      lightboxPhotoIndex: -1,
    });
  }

  render() {
    const { photos, ligthboxIsOpen, lightboxPhotoIndex } = this.state;
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
            {photos.map((photo) => {
              return (
                <Photo
                  photo={photo}
                  key={photo.id}
                  onImageClick={this.openLightBox}
                />
              );
            })}
          </Columns>
        </PhotosContainer>
        {ligthboxIsOpen
          ? (
            <PhotoLightbox
              photo={photos[lightboxPhotoIndex]}
              onClose={this.closeLightBox}
            />
          ) : null
        }
      </div>
    );
  }
}
