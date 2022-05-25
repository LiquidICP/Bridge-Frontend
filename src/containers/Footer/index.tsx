import React, { FC } from 'react';
import { FooterDesktop } from './FooterDesktop';
import { FooterMobile } from './FooterMobile';

const Footer: FC = () => (
  <>
    <FooterDesktop />
    <FooterMobile />
  </>
);

export { Footer };
