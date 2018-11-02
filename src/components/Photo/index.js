import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PhotoContainer = styled.div`
  margin: 10px;
  position: relative;

`;

const EmptyImage = styled.div`
width: 100%;
height: 250px;
background-color: rgba(64,64,64,0.3);
`;

const PhotoImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 2px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: ${props => props.opacity};
  transition: .5s ease;
`;

const PhotoInformation = styled.div`
  width: 100%;
  position: absolute;
  bottom: 40%;
  left: 50%;
  color: white;
  font-size: 20px;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
`;

const OwnerText = styled.div`
  cursor: pointer;
  height: 20px;
`;

const TitleText = styled.div`
  height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

`;

export default class Photo extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      hovering: false,
    };

    this.handleOnClickUsername = this.handleOnClickUsername.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  componentDidMount() {
    const { photo } = this.props;
    const url = `https://api.flickr.com/services/rest/?method=flickr.people.getInfo&api_key=${process.env.FLICKR_API_KEY}&user_id=${photo.owner}&format=json&nojsoncallback=1`;
    fetch(url)
      .then(response => response.json())
      .then((jsonResponse) => {
        this.setState({ username: jsonResponse.person.username._content });
      })
      .catch(error => console.error(error));
  }

  onMouseEnter() {
    this.setState({ hovering: true });
  }

  onMouseLeave() {
    this.setState({ hovering: false });
  }

  handleOnClickUsername() {
    const { photo } = this.props;
    window.open(`http://flickr.com/photos/${photo.owner}/${photo.id}`, '_newtab');
  }

  renderImage() {
    const { photo } = this.props;
    if (photo.imageUrl !== undefined) {
      return <PhotoImage src={photo.imageUrl} />;
    }
    return null;
  }

  renderOverlay() {
    const { photo } = this.props;
    const { username, hovering } = this.state;
    if (photo.imageUrl !== undefined) {
      return (
        <Overlay opacity={hovering ? 1 : 0}>
          <PhotoInformation>
            <TitleText>{photo.title}</TitleText>
            <OwnerText onClick={this.handleOnClickUsername}>
              by
              {username}
            </OwnerText>
          </PhotoInformation>
        </Overlay>
      )
    }
    return null;
  }

  render() {
    const { photo } = this.props;
    return (
      <PhotoContainer
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        key={photo.id}
      >
        {this.renderImage()}
        {this.renderOverlay()}
      </PhotoContainer>
    );
  }
}

Photo.propTypes = {
  photo: PropTypes.shape({
    title: PropTypes.string,
    owner: PropTypes.string,
    id: PropTypes.string,
    imageUrl: PropTypes.string,
  }),
};

Photo.defaultProps = {
  photo: {},
};
