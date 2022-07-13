import React, { FC } from 'react';
import { links } from 'global/links';
import styles from './styles.module.css';

const FooterMobile: FC = () => (
  <footer className={styles.footer_mobile__container}>
    <div className={styles.footer_mobile__contacts__box}>
      <p>
        Contact Us −
        {' '}
        {links.mail}
      </p>
      <p
        className={styles.footer_mobile__right_link}
      >
        <a
          href={links.linktree}
          target="_blank"
          rel="noreferrer"
        >
          Linktree
        </a>
      </p>
    </div>
  </footer>
);

export { FooterMobile };
