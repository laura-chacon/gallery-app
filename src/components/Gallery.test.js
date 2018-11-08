import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactPaginate from 'react-paginate';
import fetchMock from 'fetch-mock';
import Gallery from './Gallery';
import Photo from './Photo';
import PhotoLightbox from './PhotoLightbox';

configure({ adapter: new Adapter() });

afterEach(() => {
  fetchMock.reset();
});

// Hack so that promises within componentDidMount get run
// https://github.com/facebook/jest/issues/2157#issuecomment-279171856
function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

function mockFlickrResponse() {
  const photos = [0, 1, 2]
    .map(i => ({
      title: `t${i}`,
      owner: `o${i}`,
      id: `id${i}`,
      url_z: `url${i}`,
      count_comments: `c${i}`,
      count_faves: `f${i}`,
    }));
  const fakeResponse = {
    photos: {
      photo: photos,
      pages: 15,
    },
  };
  fetchMock.get('*', fakeResponse);
}

test('Basic gallery layout', async () => {
  mockFlickrResponse();
  const wrapper = shallow(<Gallery />);
  await flushPromises();

  expect(wrapper.find(Photo)).toHaveLength(3);
  expect(wrapper.find(Photo).at(0)).toHaveProp({
    photo: {
      title: 't0',
      owner: 'o0',
      id: 'id0',
      imageUrl: 'url0',
      commentsCount: 'c0',
      favesCount: 'f0',
    },
  });
  expect(wrapper.find(Photo).at(2)).toHaveProp({
    photo: {
      title: 't2',
      owner: 'o2',
      id: 'id2',
      imageUrl: 'url2',
      commentsCount: 'c2',
      favesCount: 'f2',
    },
  });
  expect(wrapper.find(ReactPaginate)).toHaveLength(1);
  expect(wrapper.find(ReactPaginate).at(0)).toHaveProp({
    pageCount: 15,
  });
  expect(wrapper.find(PhotoLightbox)).toHaveLength(0);
});

test('Open lightbox', async () => {
  mockFlickrResponse();
  const wrapper = shallow(<Gallery />);
  await flushPromises();

  wrapper.instance().openLightBox('id1');

  expect(wrapper.find(PhotoLightbox)).toHaveLength(1);
  expect(wrapper.find(PhotoLightbox).at(0)).toHaveProp({
    photo: {
      title: 't1',
      owner: 'o1',
      id: 'id1',
      imageUrl: 'url1',
      commentsCount: 'c1',
      favesCount: 'f1',
    },
  });
});

test('Close lightbox', async () => {
  mockFlickrResponse();
  const wrapper = shallow(<Gallery />);
  await flushPromises();

  wrapper.instance().openLightBox('id1');
  wrapper.instance().closeLightBox();

  expect(wrapper.find(PhotoLightbox)).toHaveLength(0);
});
