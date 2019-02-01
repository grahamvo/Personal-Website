import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-scroll';

// Components
import ImageCarousel from 'Components/portfolio/ImageCarousel';
import Thoughtblox from 'Components/portfolio/Thoughtblox';
import Merkato from 'Components/portfolio/Merkato';

// Styles
import styles from 'SCSS/portfolio/portfolio.scss';

class Portfolio extends Component {
    static propTypes = {
        next: PropTypes.string,
    }

    static defaultProps = {
        next: null,
    }

    state = {
        entered: false,
        page: 1,
    }

    componentDidMount() {
        this.timeout = setTimeout(() => {
            this.setState({ entered: true });
        }, 300);

        if (this.scrollRef) {
            this.registerScroll(this.scrollRef);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
        this.unregisterScroll(this.scrollRef);
    }

    registerScroll = (node) => {
        node.addEventListener('scroll', this.handleScroll);
    }

    unregisterScroll = (node) => {
        node.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = (e) => {
        const { page } = this.state;
        const { scrollTop, clientHeight, children } = e.target;
        const rect = children[1].getBoundingClientRect().top;

        if (rect < clientHeight && page !== 2) {
            this.setState({ page: 2 });
        }

        if (rect > clientHeight && page !== 1) {
            this.setState({ page: 1 });
        }

        if (scrollTop > 40) {
            this.title.className = `${styles.headerSlide} ${styles.header}`;
        } else if (scrollTop < 40) {
            this.title.className = `${styles.headerEnter} ${styles.header}`;
        }
    }

    render() {
        const { next } = this.props;
        const { entered, page } = this.state;
        const shouldEnter = entered && !next;

        return (
            <div className={styles.portfolio}>
                <div
                    className={
                        shouldEnter
                            ? `${styles.headerEnter} ${styles.header}`
                            : styles.header
                    }
                    ref={(title) => { this.title = title; }}
                >
                    <span className={styles.dark}>Portfolio.</span>
                    <span className={styles.light}>io.</span>
                </div>
                <div className={styles.dots}>
                    <Link
                        className={`${styles.dotActive} ${styles.dot}`}
                        to="Thoughtblox"
                        smooth
                        duration={400}
                        containerId="scrollContainer"
                        offset={-350}
                    />
                    <Link
                        className={page >= 2 ? `${styles.dotActive} ${styles.dot}` : styles.dot}
                        to="Merkato"
                        smooth
                        duration={400}
                        containerId="scrollContainer"
                        offset={-350}
                    />
                </div>
                <ImageCarousel enter={shouldEnter} page={page} />
                <div
                    className={
                        shouldEnter
                            ? `${styles.infoContainerActive} ${styles.infoContainer}`
                            : styles.infoContainer
                    }
                    ref={(scrollRef) => { this.scrollRef = scrollRef; }}
                    id="scrollContainer"
                >
                    <Thoughtblox />
                    <Merkato />
                </div>
            </div>
        );
    }
}

export default Portfolio;
