import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { links } from 'global/links';
import styles from './styles.module.css';

const FooterMobile: FC = () => (
  <footer className={styles.footer_mobile__container}>
    <div className={styles.footer_mobile__contacts__box}>
      <p>
        Contact Us −
        <br />
        {links.mail}
      </p>
      <p>
        Office −
        <br />
        office address
      </p>
    </div>
    <div className={styles.footer_mobile__links__box}>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/">Products</Link></li>
        <li><Link to="/">Company</Link></li>
        <li><Link to="/">Blog</Link></li>
        <li><Link to="/">FAQ</Link></li>
      </ul>
      <ul>
        <li>
          <a
            href={links.telegram}
            target="_blank"
            rel="noreferrer"
          >
            Telegram
          </a>
        </li>
        <li>
          <a
            href={links.twitter}
            target="_blank"
            rel="noreferrer"
          >
            Twitter
          </a>
        </li>
        <li>
          <a
            href={links.discord}
            target="_blank"
            rel="noreferrer"
          >
            Discord
          </a>
        </li>
      </ul>
    </div>
  </footer>
);

export { FooterMobile };
