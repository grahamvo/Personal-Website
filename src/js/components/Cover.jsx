import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ReactSVG from 'react-svg';
// import { Transition } from 'react-transition-group';

// Styles
import styles from 'SCSS/cover.scss';

// Assets
import DarkGreen from 'SVG/dark-green.svg';
import LightGreen from 'SVG/light-green.svg';
import DarkRed from 'SVG/dark-red.svg';
import LightRed from 'SVG/light-red.svg';

class Cover extends Component {
    static propTypes = {
        current: PropTypes.string.isRequired,
        next: PropTypes.string,
    }

    static defaultProps = {
        next: null,
    }

    state = {
        style: styles.cover,
        top: styles.topGroup,
        bottom: styles.bottomGroup,
    }

    componentDidMount() {
        const { current } = this.props;
        if (current === '/bio') {
            this.handleNavToBio();
        }

        if (current === '/portfolio') {
            this.handleNavToPortfolio();
        }
    }

    componentDidUpdate(prevProps) {
        const { current, next } = this.props;
        if (prevProps.current !== current) {
            if (current === '/bio') {
                this.handleNavToBio();
            }

            if (current === '/portfolio') {
                this.handleNavToPortfolio();
            }
        }

        if (prevProps.next !== next) {
            if (next === '/' && current === '/bio') {
                this.handleNavToHomeFromBio();
            }

            if (next === '/' && current === '/portfolio') {
                this.handleNavToHomeFromPortfolio();
            }

            if (next === '/bio' && current === '/') {
                this.handleNavFromHomeToBio();
            }

            if (next === '/portfolio' && current === '/') {
                this.handleNavFromHomeToPortfolio();
            }
        }
    }

    handleNavToBio = () => {
        this.setState({
            style: `${styles.bioCover} ${styles.cover}`,
        });

        this.timeout = setTimeout(() => {
            this.setState({
                style: `${styles.bioEnter} ${styles.bioCover} ${styles.cover}`,
            });
        }, 200);
    }

    handleNavToPortfolio = () => {
        this.setState({
            style: `${styles.portfolioCover} ${styles.cover}`,
        });

        this.timeout = setTimeout(() => {
            this.setState({
                style: `${styles.portfolioEnter} ${styles.portfolioCover} ${styles.cover}`,
            });
        }, 200);
    }

    handleNavFromHomeToBio = () => {
        this.setState({
            bottom: `${styles.animateBottom} ${styles.bottomGroup}`,
            top: styles.topGroup,
        });
    }

    handleNavFromHomeToPortfolio = () => {
        this.setState({
            top: `${styles.animateTop} ${styles.topGroup}`,
            bottom: styles.bottomGroup,
        });
    }

    handleNavToHomeFromBio = () => {
        this.setState({
            style: `${styles.bioCover} ${styles.cover}`,
            top: `${styles.topGroup}`,
        });

        this.timeout = setTimeout(() => {
            this.setState({
                style: `${styles.cover}`,
                bottom: `${styles.animateBottomContract} ${styles.bottomGroup}`,
            });
        }, 600);
    }

    handleNavToHomeFromPortfolio = () => {
        this.setState({
            style: `${styles.portfolioCover} ${styles.cover}`,
            bottom: `${styles.bottomGroup}`,
        });

        this.timeout = setTimeout(() => {
            this.setState({
                style: `${styles.cover}`,
                top: `${styles.animateTopContract} ${styles.topGroup}`,
            });
        }, 600);
    }

    render() {
        const { current } = this.props;
        const { style, top, bottom } = this.state;

        return ([
            <div className={style} key="cover" />,
            <div
                className={top}
                style={{ display: current !== '/' ? 'none' : null }}
                key="topSVG"
            >
                <ReactSVG className={styles.topSVG} src={LightGreen} />
                <ReactSVG className={styles.topSVG} src={DarkGreen} />
            </div>,
            <div
                className={bottom}
                style={{ display: current !== '/' ? 'none' : null }}
                key="bottomSVG"
            >
                <ReactSVG className={styles.bottomSVG} src={LightRed} />
                <ReactSVG className={styles.bottomSVG} src={DarkRed} />
            </div>,
        ]);
    }
}

export default withRouter(Cover);
