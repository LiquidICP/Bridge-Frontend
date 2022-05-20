import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { BridgeLogo } from 'assets/img';
import styles from './styles.module.css';

const Header: FC = () => (
  <header className={styles.header__container}>
    <Link to="/">
      <img src={BridgeLogo} alt="Bridge logo" />
    </Link>
    <nav className={styles.header__menu__container}>
      <ul>
        <li className={styles.item_menu__active}>Bridge</li>
        <li>Menu Item</li>
        <li>Menu Item</li>
      </ul>
    </nav>
  </header>
);

export { Header };
