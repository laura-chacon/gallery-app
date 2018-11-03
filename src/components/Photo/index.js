import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FaStar, FaComment } from 'react-icons/fa';

const PhotoContainer = styled.div`
  margin: 10px;
  position: relative;
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
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: -22px;
  left: 50%;
  color: white;
  font-size: 20px;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: left;
  background-image: linear-gradient(transparent, #000000);
`;

const CaptionAndUsername = styled.div`
  padding: 0 10px;
  width: 60%;
`;

const OwnerText = styled.div`
  cursor: pointer;
  height: 20px;
  font-size: 16px;
`;

const TitleText = styled.div`
  height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
    margin-bottom: 5px;
  font-size: 18px;
`;

const FavsAndComments = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const Comments = styled.div`
  margin: 0 5px;
`;

const Faves = styled.div`
  margin: 0 5px;
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
    return (
      <PhotoImage
        src={photo.imageUrl}
      />
    );
  }

  renderCaptionAndUsername() {
    const { photo } = this.props;
    const { username } = this.state;
    const usernameText = `by ${username}`;
    return (
      <CaptionAndUsername>
        <TitleText>{photo.title}</TitleText>
        <OwnerText onClick={this.handleOnClickUsername}>
          {usernameText}
        </OwnerText>
      </CaptionAndUsername>
    );
  }

  renderFavsAndComments() {
    const { photo } = this.props;
    return (
      <FavsAndComments>
        <FaStar />
        <Comments>{photo.count_comments}</Comments>
        <FaComment />
        <Faves>{photo.count_faves}</Faves>
      </FavsAndComments>
    );
  }

  renderOverlay() {
    const { hovering } = this.state;
    const { photo, onImageClick } = this.props;
    return (
      <Overlay
        onClick={() => onImageClick(photo.id)}
        opacity={hovering ? 1 : 0}
      >
        <PhotoInformation>
          {this.renderCaptionAndUsername()}
          {this.renderFavsAndComments()}
        </PhotoInformation>
      </Overlay>
    );
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
    count_comments: PropTypes.string,
    count_faves: PropTypes.string,
  }),
  onImageClick: PropTypes.func,
};

Photo.defaultProps = {
  photo: {},
  onImageClick: () => {},
};
