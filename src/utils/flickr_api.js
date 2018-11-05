function baseUrl() {
  return 'https://api.flickr.com/services/rest';
}

function objectToQueryString(o) {
  return Object.keys(o)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(o[key])}`)
    .join('&');
}

function commonQueryStringParams() {
  return {
    api_key: process.env.FLICKR_API_KEY,
    format: 'json',
    nojsoncallback: 1,
  };
}

function searchPhotos(photosPerPage) {
  const qs = Object.assign({
    method: 'flickr.photos.search',
    tags: 'nyc',
    license: '1,2,3,4,5,6,7,8,9,10',
    extras: 'count_comments,count_faves,url_z',
    sort: 'interestingness-desc',
    per_page: photosPerPage,
  }, commonQueryStringParams());
  const url = `${baseUrl()}?${objectToQueryString(qs)}`;
  return fetch(url)
    .then(response => response.json())
    .then((jsonResponse) => {
      const photos = jsonResponse.photos.photo.map(photo => ({
        title: photo.title,
        owner: photo.owner,
        id: photo.id,
        imageUrl: photo.url_z,
        commentsCount: photo.count_comments,
        favesCount: photo.count_faves,
      }));
      return {
        photos,
        pagesCount: jsonResponse.photos.pages,
      };
    })
    .catch(error => console.error(error));
}

function getUsername(userId) {
  const qs = Object.assign({
    method: 'flickr.people.getInfo',
    user_id: userId,
  }, commonQueryStringParams());
  const url = `${baseUrl()}?${objectToQueryString(qs)}`;
  return fetch(url)
    .then(response => response.json())
    .then(jsonResponse => jsonResponse.person.username._content)
    .catch(error => console.error(error));
}

function getPhotoInfo(photoId) {
  const qs = Object.assign({
    method: 'flickr.photos.getInfo',
    photo_id: photoId,
  }, commonQueryStringParams());
  const url = `${baseUrl()}?${objectToQueryString(qs)}`;
  return fetch(url)
    .then(response => response.json())
    .then((jsonResponse) => {
      let tags = [];
      if (jsonResponse.photo.tags) {
        tags = jsonResponse.photo.tags.tag.map(tag => tag._content);
      }
      let location = {};
      if (jsonResponse.photo.location) {
        location = {
          locality: (jsonResponse.photo.location.locality || {})._content,
          country: (jsonResponse.photo.location.country || {})._content,
        };
      }
      return {
        description: jsonResponse.photo.description._content,
        date: jsonResponse.photo.dates.taken,
        location,
        tags,
        username: jsonResponse.photo.owner.username,
      };
    })
    .catch(error => console.error(error));
}

module.exports = {
  getPhotoInfo,
  getUsername,
  searchPhotos,
};
