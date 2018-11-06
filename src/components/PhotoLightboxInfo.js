import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InfoPhotoLightboxContainer = styled.div`
`;

export default class PhotoLightboxInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static getLocation(props) {
    let { location } = props;
    if (location) {
      const { locality, country } = location;
      location = (locality || '');
      if (locality && country) {
        location += ', ';
      }
      location += (country || '');
    }
    return location;
  }

  static getFirstRow(props) {
    const { date } = props;
    const location = PhotoLightboxInfo.getLocation(props);
    let row = '';
    if (location) {
      row += `📍 ${location}`;
    }
    if (date) {
      if (location) {
        row += ' ― ';
      }
      row += `📅 ${date}`;
    }
    return row;
  }

  static getSecondRow(props) {
    const { tags } = props;
    let row = '';
    if (tags) {
      const tagsToRender = tags.slice(0, 3).join(', ');
      row += `🏷️ ${tagsToRender}`;
    }
    return row;
  }

  static getThirdRow(props) {
    const { commentsCount, favesCount } = props;
    let row = '';
    if (commentsCount) {
      row += `💬 ${commentsCount}`;
    }
    if (favesCount) {
      if (commentsCount) {
        row += ' ― ';
      }
      row += `⭐ ${favesCount}`;
    }
    return row;
  }

  static getFourthRow(props) {
    const { description } = props;
    return description || '';
  }

  render() {
    const firstRow = PhotoLightboxInfo.getFirstRow(this.props);
    const secondRow = PhotoLightboxInfo.getSecondRow(this.props);
    const thirdRow = PhotoLightboxInfo.getThirdRow(this.props);
    const fourthRow = PhotoLightboxInfo.getFourthRow(this.props);
    return (
      <InfoPhotoLightboxContainer>
        <div>{firstRow}</div>
        <div>{secondRow}</div>
        <div>{thirdRow}</div>
        <div>{fourthRow}</div>
      </InfoPhotoLightboxContainer>
    );
  }
}

PhotoLightboxInfo.propTypes = {
  location: PropTypes.shape({}),
};

PhotoLightboxInfo.defaultProps = {
  location: {},
};
