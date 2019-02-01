import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styles from 'SCSS/header/burgerMenu.scss';

const BurgerMenu = ({ toggled, location, toggleMenu }) => {
    const getColor = () => {
        if (location.pathname === '/portfolio' || toggled) {
            return '#FBFBFB';
        }

        return '#3C3C3C';
    };

    return (
        <div
            className={styles.burger}
            onClick={toggleMenu}
            style={{
                borderColor: getColor(),
            }}
        >
            <div className={styles.arms}>
                <span
                    className={
                        toggled ? `${styles.remove} ${styles.arm}` : styles.arm
                    }
                    style={{ backgroundColor: getColor() }}
                />
                <span
                    className={
                        toggled ? `${styles.remove} ${styles.arm}` : styles.arm
                    }
                    style={{ backgroundColor: getColor() }}
                />
                <span
                    className={
                        toggled ? `${styles.remove} ${styles.arm}` : styles.arm
                    }
                    style={{ backgroundColor: getColor() }}
                />
            </div>
            <div
                className={
                    toggled
                        ? `${styles.diagonalEnter} ${styles.diagonal}`
                        : styles.diagonal
                }
            />
        </div>
    );
};

BurgerMenu.propTypes = {
    toggled: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    toggleMenu: PropTypes.func.isRequired,
};

export default BurgerMenu;
