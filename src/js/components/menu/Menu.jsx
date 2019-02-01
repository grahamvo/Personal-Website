import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styles from 'SCSS/menu/menu.scss';

const Menu = ({ enter, location, handleClick }) => (
    <div className={enter ? `${styles.menuActive} ${styles.menu}` : styles.menu}>
        <div
            className={
                enter
                    ? `${styles.linkContainerActive} ${styles.linkContainer}`
                    : styles.linkContainer
            }
        >
            <div
                className={
                    location.pathname === '/'
                        ? `${styles.activeLink} ${styles.link}`
                        : styles.link
                }
                onClick={() => handleClick('/')}
            >
                Home
            </div>
            <div
                className={
                    location.pathname === '/bio'
                        ? `${styles.activeLink} ${styles.link}`
                        : styles.link
                }
                onClick={() => handleClick('/bio')}
            >
                Bio
            </div>
            <div
                className={
                    location.pathname === '/portfolio'
                        ? `${styles.activeLink} ${styles.link}`
                        : styles.link
                }
                onClick={() => handleClick('/portfolio')}
            >
                Portfolio
            </div>
            <a
                href="https://dribbble.com/grahamvo"
                target="__blank"
                className={styles.link}
            >
                Dribbble
            </a>
            <a href="https://github.com/grahamvo" target="__blank" className={styles.link}>
                GitHub
            </a>
            <a
                href="https://www.linkedin.com/in/graham-von-oehsen-2067b776/"
                target="__blank"
                className={styles.link}
            >
                LinkedIn
            </a>
            <a href="mailto:grahamvo@gmail.com" className={styles.link}>
                Contact
            </a>
        </div>
        <div className={enter ? `${styles.copywriteActive} ${styles.copywrite}` : styles.copywrite}>
            © Graham von Oehsen 2019
        </div>
    </div>
);

Menu.propTypes = {
    enter: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    handleClick: PropTypes.func.isRequired,
};

export default Menu;
