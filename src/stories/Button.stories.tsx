import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from 'antd';

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

export const Primary: ComponentStory<typeof Button> = () => (
  <Button
    type="primary"
    block
  >
    Sign in
  </Button>
);

export const Add: ComponentStory<typeof Button> = () => (
  <Button type="primary">
    Add
  </Button>
);

export const Cancel: ComponentStory<typeof Button> = () => (
  <Button>
    Cancel
  </Button>
);

export const ToWatchList: ComponentStory<typeof Button> = () => (
  <Button
    size="small"
    ghost
    type="primary"
  >
    To WatchList
  </Button>
);
