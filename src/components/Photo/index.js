import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PhotoContainer = styled.div`

`;

const OwnerText = styled.div`

`;

export default class Photo extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
    };
  }

  componentDidMount() {
    const { photo } = this.props;
    const url = `https://api.flickr.com/services/rest/?method=flickr.people.getInfo&api_key=${process.env.FLICKR_API_KEY}&user_id=${photo.owner}&format=json&nojsoncallback=1`;
    fetch(url)
      .then(response => response.json())
      .then((jsonResponse) => {
        this.setState({ username: jsonResponse.person.username._content });
      })
      .bind(this);
  }

  render() {
    const { photo } = this.props;
    const { username } = this.state;
    return (
      <PhotoContainer key={photo.owner}>
        <img alt={photo.title} src={photo.imageUrl} />
        <OwnerText>{username}</OwnerText>
      </PhotoContainer>
    );
  }
}

Photo.propTypes = {
  photo: PropTypes.shape({
    title: PropTypes.string,
    owner: PropTypes.string,
    imageUrl: PropTypes.string,
  }),
};

Photo.defaultProps = {
  photo: {},
};
