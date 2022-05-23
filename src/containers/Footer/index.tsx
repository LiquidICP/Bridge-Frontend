import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { BridgeLogo } from 'assets/img';
import styles from './styles.module.css';

const Footer: FC = () => (
  <footer className={styles.footer__container}>
    <section className={styles.footer__links__box}>
      <div className={styles.links_top__box}>
        <Link to="/">Terms of Use</Link>
        <Link to="/">Privacy policy</Link>
      </div>
      <div className={styles.links_soc_media__box}>
        <Link to="/">Telegram</Link>
        <Link to="/">Twitter</Link>
        <Link to="/">Discord</Link>
      </div>
    </section>
    <section className={styles.footer__logo__box}>
      <img src={BridgeLogo} alt="" />
    </section>
    <section className={styles.footer__copy__box}>
      <p>&copy; Copyright 2020-2021. All Rights Reserved</p>
    </section>
  </footer>
);

export { Footer };
