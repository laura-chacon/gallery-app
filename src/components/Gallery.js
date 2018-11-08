import React, { Component } from 'react';
import styled from 'styled-components';
import Columns from 'react-columns';
import ReactPaginate from 'react-paginate';
import Photo from './Photo';
import PhotoLightbox from './PhotoLightbox';
import { searchPhotos } from '../utils/flickr_api';

const photosPerPage = 15;

const PhotosContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ReactPaginateContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default class Gallery extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      ligthboxIsOpen: false,
      lightboxPhotoIndex: -1,
      pageNumber: 1,
      pagesCount: 0,
    };

    this.openLightBox = this.openLightBox.bind(this);
    this.closeLightBox = this.closeLightBox.bind(this);
  }

  componentDidMount() {
    const { pageNumber } = this.state;
    this.getPhotos(pageNumber);
  }

  getPhotos(pageNumber) {
    searchPhotos(pageNumber, photosPerPage)
      .then((newState) => {
        this.setState(Object.assign(newState, { pageNumber }));
      });
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

  renderPagination() {
    const { pagesCount } = this.state;
    return (
      <ReactPaginateContainer>
        <ReactPaginate
          containerClassName="pagination"
          pageCount={pagesCount}
          breakLabel={<a href="">...</a>}
          marginPagesDisplayed={0}
          pageRangeDisplayed={2}
          onPageChange={nextPageNumber => this.getPhotos(nextPageNumber.selected + 1)}
        />
      </ReactPaginateContainer>
    );
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
        <PhotosContainer>
          <Columns queries={queries}>
            {photos.map(photo => (
              <Photo
                photo={photo}
                key={photo.id}
                onImageClick={this.openLightBox}
              />
            ))}
          </Columns>
        </PhotosContainer>
        {this.renderPagination()}
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
