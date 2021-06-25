import * as React from 'react';

import Title from './Title';

export default {
  title: 'Title',
  component: Title
};

const Template = ({ ...args }) => <Title {...args} />;

export const Usage = Template.bind({});

Usage.args = {
  text: 'Hello World'
};
