import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

// Styles
import styles from 'SCSS/portfolio/imageCarousel.scss';

// Assets
import ThoughtbloxHome from 'Images/thoughtblox-home.png';
import ThoughtbloxGroup from 'Images/thoughtblox-group.png';
import ThoughtbloxEditor from 'Images/thoughtblox-editor.png';
import MerkatoHero from 'Images/merkato-hero.png';
import MerkatoHeroDark from 'Images/merkato-hero-dark.png';
import MerkatoServices from 'Images/merkato-services.png';
import Notch from 'SVG/notch.svg';
import Exit from 'SVG/exit.svg';

const images = {
    thoughtblox: [
        ThoughtbloxHome,
        ThoughtbloxGroup,
        ThoughtbloxEditor,
    ],
    merkato: [
        MerkatoHero,
        MerkatoServices,
        MerkatoHeroDark,
    ],
};

class ImageCarousel extends Component {
    static propTypes = {
        enter: PropTypes.bool.isRequired,
        page: PropTypes.number.isRequired,
    }

    state = {
        group: 'thoughtblox',
        item: 0,
        expand: false,
    }

    componentDidMount() {
        this.startInterval();
    }

    componentDidUpdate(prevProps) {
        const { page } = this.props;
        if (prevProps.page !== page) {
            this.changePage(page);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    startInterval = () => {
        this.interval = setInterval(() => {
            const { item, group } = this.state;
            this.setState({
                item: item + 1 < images[group].length ? item + 1 : 0,
            });
        }, 7000);
    }

    switchImage = (direction) => {
        const { item, group } = this.state;
        if (direction === 'forward') {
            this.setState({
                item: item + 1 < images[group].length ? item + 1 : 0,
            });
        } else if (direction === 'back') {
            this.setState({
                item: item - 1 < 0 ? images[group].length - 1 : item - 1,
            });
        }
    }

    changePage = (page) => {
        clearInterval(this.interval);

        if (page === 1) {
            this.setState({
                group: 'thoughtblox',
                item: 0,
            });
        }
        if (page === 2) {
            this.setState({
                group: 'merkato',
                item: 0,
            });
        }
        if (page === 3) {
            this.setState({
                group: 'personal',
                item: 0,
            });
        }

        this.startInterval();
    }

    handleToggleExpand = () => {
        const { expand } = this.state;
        if (expand) {
            this.startInterval();
        } else {
            clearInterval(this.interval);
        }
        this.setState({ expand: !expand });
    }

    renderImages = () => {
        const { enter } = this.props;
        const { group, item } = this.state;
        const defaultStyle = {
            opacity: 0,
            transition: 'opacity 200ms ease-in',
        };
        const transitionStyles = {
            entering: {
                opacity: 0,
            },
            entered: {
                opacity: 1,
            },
        };

        return (
            <div
                className={
                    enter
                        ? `${styles.imageContainerEnter} ${styles.imageContainer}`
                        : styles.imageContainer
                }
                onClick={this.handleToggleExpand}
                key="carousel"
            >
                {
                    images[group].map((image, i) => (
                        <Transition
                            key={image}
                            in={item === i}
                            timeout={200}
                            mountOnEnter
                            unmountOnExit
                            appear
                        >
                            {state => (
                                <img
                                    src={image}
                                    alt="item"
                                    style={{
                                        ...defaultStyle,
                                        ...transitionStyles[state],
                                    }}
                                    className={styles.image}
                                />
                            )}
                        </Transition>
                    ))
                }
            </div>
        );
    }

    renderExpandedImage = () => {
        const { group, item, expand } = this.state;
        const defaultStyle = {
            opacity: 0,
            transition: 'opacity 200ms ease-in-out',
        };
        const transitionStyles = {
            entering: {
                opacity: 0,
            },
            entered: {
                opacity: 1,
            },
            exiting: {
                opacity: 1,
            },
        };

        return (
            <div
                className={
                    expand
                        ? `${styles.imageContainerExpanded} ${styles.imageContainerExpand}`
                        : styles.imageContainerExpand
                }
                key="expand"
            >
                {
                    images[group].map((image, i) => (
                        <Transition
                            key={image}
                            in={item === i && expand}
                            timeout={200}
                            mountOnEnter
                            unmountOnExit
                            appear
                        >
                            {state => ([
                                <img
                                    src={Exit}
                                    alt="exit"
                                    className={styles.exit}
                                    key="exit"
                                    onClick={this.handleToggleExpand}
                                />,
                                <img
                                    src={Notch}
                                    alt="notch"
                                    className={styles.notch1}
                                    key="notch1"
                                    onClick={() => this.switchImage('back')}
                                />,
                                <img
                                    src={image}
                                    alt="item"
                                    style={{
                                        ...defaultStyle,
                                        ...transitionStyles[state],
                                    }}
                                    className={styles.image}
                                    key={image}
                                />,
                                <img
                                    src={Notch}
                                    alt="notch"
                                    className={styles.notch2}
                                    key="notch2"
                                    onClick={() => this.switchImage('forward')}
                                />,
                            ])}
                        </Transition>
                    ))
                }
            </div>
        );
    }

    render() {
        return ([
            this.renderImages(),
            this.renderExpandedImage(),
        ]);
    }
}

export default ImageCarousel;
