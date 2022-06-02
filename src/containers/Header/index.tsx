import React, { FC, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'components';
import { BridgeLogo, MenuIcon } from 'assets/img';
import cx from 'classnames';
import styles from './styles.module.css';

const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onMenuClick = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  return (
    <header className={styles.header__container}>
      <div className={styles.header__space} />
      <div className={styles.header__logo__box}>
        <Link to="/">
          <img
            src={BridgeLogo}
            alt="Bridge logo"
          />
        </Link>
      </div>
      <nav
        className={
          cx(
            styles.header__menu__container,
            { [styles.menu__open]: isMenuOpen },
          )
        }
      >
        <ul>
          <li className={styles.item_menu__active}>Bridge</li>
          <li>Menu Item</li>
          <li>Menu Item</li>
        </ul>
      </nav>
      <div className={styles.header__button__box}>
        <Button
          onClick={onMenuClick}
          className={styles.header__button}
          theme="icon"
        >
          <img
            src={MenuIcon}
            alt="Menu"
          />
        </Button>
      </div>
    </header>
  );
};

export { Header };
