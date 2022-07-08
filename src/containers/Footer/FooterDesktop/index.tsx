import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { BridgeLogo } from 'assets/img';
import { links } from 'global/links';
import styles from './styles.module.css';

const FooterDesktop: FC = () => (
  <footer className={styles.footer__container}>
    <section className={styles.footer__links__box}>
      <div className={styles.links_top__box}>
        <Link to="/">Terms of Use</Link>
        <Link to="/">Privacy policy</Link>
      </div>
      <div className={styles.links_soc_media__box}>
        <a
          href={links.telegram}
          target="_blank"
          rel="noreferrer"
        >
          Telegram
        </a>
        <a
          href={links.twitter}
          target="_blank"
          rel="noreferrer"
        >
          Twitter
        </a>
        <a
          href={links.discord}
          target="_blank"
          rel="noreferrer"
        >
          Discord
        </a>
      </div>
    </section>
    <section className={styles.footer__logo__box}>
      <img
        src={BridgeLogo}
        alt="Logo Bridge"
      />
    </section>
    <section className={styles.footer__copy__box}>
      <p>&copy; Copyright 2020-2022. All Rights Reserved</p>
    </section>
  </footer>
);

export { FooterDesktop };
