import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PhotoLightboxInfo from './PhotoLightboxInfo';

configure({ adapter: new Adapter() });

test('All props set', () => {
  const props = {
    date: '2018',
    location: {
      locality: 'Barcelona',
    },
    tags: ['t1', 't2', 't3', 't4', 't5'],
    description: 'sagrada familia',
    commentsCount: 20,
    favesCount: 10,
  };
  const wrapper = shallow(<PhotoLightboxInfo {...props} />);
  expect(wrapper.find('div')).toHaveLength(4);
  expect(wrapper.find('div').at(0)).toHaveText('📍 Barcelona ― 📅 2018');
  expect(wrapper.find('div').at(1)).toHaveText('🏷️ t1, t2, t3');
  expect(wrapper.find('div').at(2)).toHaveText('💬 20 ― ⭐ 10');
  expect(wrapper.find('div').at(3)).toHaveText('sagrada familia');
});

test('Empty props', () => {
  const props = {};
  const wrapper = shallow(<PhotoLightboxInfo {...props} />);
  expect(wrapper.find('div')).toHaveLength(4);
  expect(wrapper.find('div').at(0)).toHaveText('');
  expect(wrapper.find('div').at(1)).toHaveText('');
  expect(wrapper.find('div').at(2)).toHaveText('');
  expect(wrapper.find('div').at(3)).toHaveText('');
});

test('Some empty props', () => {
  const props = {
    date: '2018',
    location: {
      country: 'Spain',
    },
  };
  const wrapper = shallow(<PhotoLightboxInfo {...props} />);
  expect(wrapper.find('div').at(0)).toHaveText('📍 Spain ― 📅 2018');
});
