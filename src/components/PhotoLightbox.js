import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import PropTypes from 'prop-types';

export default class PhotoLightbox extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount() {

  }

  render() {
    const { photo, onClose } = this.props;
    return (
      <Lightbox
        mainSrc={photo.imageUrl}
        imageTitle={photo.title}
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
    count_comments: PropTypes.string,
    count_faves: PropTypes.string,
  }),
  onClose: PropTypes.func,
};

PhotoLightbox.defaultProps = {
  photo: {},
  onClose: () => {},
};
