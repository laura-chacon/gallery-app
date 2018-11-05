import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InfoPhotoLightboxContainer = styled.div`
`;

export default class InfoPhotoLightbox extends Component {
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
    const location = InfoPhotoLightbox.getLocation(props);
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
    const { countComments, countFaves } = props;
    let row = '';
    if (countComments) {
      row += `💬 ${countComments}`;
    }
    if (countFaves) {
      if (countComments) {
        row += ' ― ';
      }
      row += `⭐ ${countFaves}`;
    }
    return row;
  }

  static getFourthRow(props) {
    const { description } = props;
    return description || '';
  }

  render() {
    const firstRow = InfoPhotoLightbox.getFirstRow(this.props);
    const secondRow = InfoPhotoLightbox.getSecondRow(this.props);
    const thirdRow = InfoPhotoLightbox.getThirdRow(this.props);
    const fourthRow = InfoPhotoLightbox.getFourthRow(this.props);
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

InfoPhotoLightbox.propTypes = {
  location: PropTypes.shape({}),
};

InfoPhotoLightbox.defaultProps = {
  location: {},
};
