import React, { Component } from 'react';
import styled from 'styled-components';

const PhotoContainer = styled.div`

`;

const OwnerText = styled.div`

`;

const url = 'https://api.flickr.com/services/rest/';

export default class Gallery extends Component {

  constructor(){
        super();
        this.state = {
            username: '',
        };
    }

    componentDidMount() {

      fetch(url+'?method=flickr.people.getInfo'+
      '&api_key='+process.env.FLICKR_API_KEY+'&user_id='+this.props.photo.owner+
      '&format=json&nojsoncallback=1')
        .then(function(response) {
          return response.json();
        })
        .then(function(jsonResponse) {
          this.setState({username: jsonResponse.person.username._content});
        }
        .bind(this));
    }

    render() {
//        console.log('ownerInfo',this.state.ownerInfo);
        let {title, owner, imageUrl} = this.props.photo;
        let {username} = this.state;
        return (
            <PhotoContainer key = {owner}>
                <img alt = {title} src = {imageUrl}/>
                <OwnerText>{username}</OwnerText>
            </PhotoContainer>
        );
    }
}
