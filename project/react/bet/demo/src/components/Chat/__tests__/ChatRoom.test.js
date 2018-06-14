import React from 'react';
import ChatRoom from '../ChatRoom';

describe('<ChatRoom /> should render with same capture', () => {
  it('<ChatRoom /> snapshots', () => {
    const propsData = {
      dispatch: () => {},
      messages: [],
      socket: {},
      say: () => {}
    }
    const wrapper = render(<ChatRoom {...propsData} />);
    expect(renderToJson(wrapper)).toMatchSnapshot();
  });
});