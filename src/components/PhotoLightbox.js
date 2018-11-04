import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import PropTypes from 'prop-types';
import InfoPhotoLightbox from './InfoPhotoLightbox';

export default class PhotoLightbox extends Component {
  constructor() {
    super();
    this.state = {
      additionalInfo: {},
    };
  }

  componentDidMount() {
    const { photo } = this.props;
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${process.env.FLICKR_API_KEY}&photo_id=${photo.id}&format=json&nojsoncallback=1`;
    fetch(url)
      .then(response => response.json())
      .then((jsonResponse) => {
        this.setState({
          additionalInfo: {
            description: jsonResponse.photo.description._content,
            date: jsonResponse.photo.dates.taken,
            location: jsonResponse.photo.location,
            tags: jsonResponse.photo.tags,
            username: jsonResponse.photo.owner.username,
          },
        });
      })
      .catch(error => console.error(error));
  }

  render() {
    const { photo, onClose } = this.props;
    const { additionalInfo } = this.state;
    const textTitle = `${photo.title}, ${additionalInfo.username}`;
    return (
      <Lightbox
        mainSrc={photo.imageUrl}
        imageTitle={(<div>{textTitle}</div>)}
        imageCaption={(
          <InfoPhotoLightbox
            location={additionalInfo.location}
            date={additionalInfo.date}
            tags={additionalInfo.tags}
            description={additionalInfo.description}
            countComments={photo.count_comments}
            countFaves={photo.count_faves}
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
    count_comments: PropTypes.string,
    count_faves: PropTypes.string,
  }),
  onClose: PropTypes.func,
};

PhotoLightbox.defaultProps = {
  photo: {},
  onClose: () => {},
};
