import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import PropTypes from 'prop-types';
import PhotoLightboxInfo from './PhotoLightboxInfo';
import { getPhotoInfo } from '../utils/flickr_api';

export default class PhotoLightbox extends Component {
  constructor() {
    super();
    this.state = {
      date: '',
      description: '',
      location: {},
      tags: [],
      username: '',
    };
  }

  componentDidMount() {
    const { photo } = this.props;
    getPhotoInfo(photo.id)
      .then((info) => {
        this.setState(info);
      });
  }

  render() {
    const { photo, onClose } = this.props;
    const {
      date,
      description,
      location,
      tags,
      username,
    } = this.state;
    const textTitle = `${photo.title} ― ${username}`;
    return (
      <Lightbox
        mainSrc={photo.imageUrl}
        imageTitle={(<div>{textTitle}</div>)}
        imageCaption={(
          <PhotoLightboxInfo
            location={location}
            date={date}
            tags={tags}
            description={description}
            commentsCount={photo.commentsCount}
            favesCount={photo.favesCount}
          />)}
        onCloseRequest={() => onClose()}
        enableZoom={false}
      />
    );
  }
}

PhotoLightbox.propTypes = {
  photo: PropTypes.shape({
    title: PropTypes.string,
    owner: PropTypes.string,
    id: PropTypes.string,
    imageUrl: PropTypes.string,
    commentsCount: PropTypes.string,
    favesCount: PropTypes.string,
  }),
  onClose: PropTypes.func,
};

PhotoLightbox.defaultProps = {
  photo: {},
  onClose: () => {},
};
