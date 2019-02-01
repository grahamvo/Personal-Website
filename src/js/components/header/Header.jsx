import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import BurgerMenu from 'Components/header/BurgerMenu';

// Styles
import styles from 'SCSS/header/header.scss';

class Header extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
        handleClick: PropTypes.func.isRequired,
        toggleMenu: PropTypes.func.isRequired,
        next: PropTypes.string,
        enter: PropTypes.bool.isRequired,
    }

    static defaultProps = {
        next: null,
    }

    renderName = () => {
        const { location, handleClick, enter } = this.props;
        const isPortfolio = location.pathname === '/portfolio';

        if (location.pathname !== '/') {
            return (
                <div
                    onClick={() => handleClick('/')}
                    className={
                        isPortfolio && !enter
                            ? `${styles.nameDark} ${styles.name}`
                            : styles.name
                    }
                >
                    Graham von Oehsen
                </div>
            );
        }

        return <div className={styles.emptyName} />;
    };

    render() {
        const {
            location, next, toggleMenu, enter,
        } = this.props;
        const show = !next;

        return (
            <div className={show ? `${styles.show} ${styles.header}` : styles.header}>
                {this.renderName()}
                <BurgerMenu toggleMenu={toggleMenu} location={location} toggled={enter} />
            </div>
        );
    }
}

export default Header;
