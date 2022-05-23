import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Steps } from 'components';

export default {
  title: 'Steps',
  component: Steps,
} as ComponentMeta<typeof Steps>;

export const FirstStep: ComponentStory<typeof Steps> = () => (
  <Steps step={1} />
);

export const SecondStep: ComponentStory<typeof Steps> = () => (
  <Steps step={2} />
);

export const ThirdStep: ComponentStory<typeof Steps> = () => (
  <Steps step={3} />
);
