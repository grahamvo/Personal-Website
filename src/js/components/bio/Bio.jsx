import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Styles
import styles from 'SCSS/bio/bio.scss';

// Assets
import Arrow from 'SVG/red-arrow.svg';

class Bio extends Component {
    static propTypes = {
        handleClick: PropTypes.func.isRequired,
        next: PropTypes.string,
    }

    static defaultProps = {
        next: null,
    }

    state = {
        entered: false,
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
    }

    registerScroll = (node) => {
        node.addEventListener('scroll', this.handleScroll);
    }

    unregisterScroll = (node) => {
        node.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = (e) => {
        const { scrollTop } = e.target;

        if (scrollTop > 50) {
            this.title.className = `${styles.headerSlide} ${styles.header}`;
        } else if (scrollTop < 50) {
            this.title.className = `${styles.headerEnter} ${styles.header}`;
        }
    }

    handleClick = (path) => {
        const { handleClick } = this.props;
        this.setState({ entered: false });
        handleClick(path);
    }

    render() {
        const { next } = this.props;
        const { entered } = this.state;
        const shouldEnter = entered && !next;

        return (
            <div className={styles.bio}>
                <div
                    className={
                        shouldEnter
                            ? `${styles.headerEnter} ${styles.header}`
                            : styles.header
                    }
                    ref={(title) => { this.title = title; }}
                >
                    <span className={styles.light}>Bi</span>
                    <span className={styles.dark}>o.</span>
                </div>
                <div
                    className={
                        shouldEnter
                            ? `${styles.aboutActive} ${styles.about}`
                            : styles.about
                    }
                    ref={(scrollRef) => { this.scrollRef = scrollRef; }}
                >
                    <div
                        className={styles.container}
                    >
                        <div className={styles.divider} />
                        <div className={styles.paragraph}>
                            My name is Graham von Oehsen. Welcome to my portfolio.
                        </div>
                        <div className={styles.paragraph}>
                            I’m a software engineer and designer with 5+ years of
                            experience working for various start-ups and freelancing.
                            I’m passionate about creating beautiful, intuitive
                            interfaces and being on the cutting edge of software.
                        </div>
                        <div className={styles.paragraph}>
                            Currently, I am the Chief Product Officer of&nbsp;
                            <a className={styles.link} href="https://thoughtblox.com">
                                Thoughtblox
                            </a>
                            , a start-up revolutionizing the way organizations store and
                            retrieve information. I’m in charge of designing, building,
                            and maintaining everything on the front-end of the
                            application.
                        </div>
                        <div className={styles.paragraph}>
                            I’m a full-stack JavaScript engineer with a background in
                            React, Vue, TypeScript, Webpack, Electron, Node,
                            and more. I also have experience in web design,
                            graphic design, UI/UX, rebranding, and iconography.
                        </div>
                        <div className={styles.paragraph}>
                            Beyond tech, I spend time writing and playing music. I’m
                            proficient with guitar, bass, drums, keyboards and I’ve
                            played in multiple bands. One of my biggest dreams is
                            to go on tour with my music. I’m currently working on
                            completing my debut album.
                        </div>
                        <div className={styles.paragraph}>
                            Thanks for checking out my website! Feel free to&nbsp;
                            <a className={styles.link} href="mailto:grahamvo@gmail.com">
                                contact me
                            </a>
                            &nbsp;if you want to chat.
                        </div>
                    </div>
                    <div className={styles.linkContain}>
                        <div className={styles.backLink} onClick={() => this.handleClick('/')}>
                            <img src={Arrow} alt="arrow" className={styles.arrow} />
                            <div className={styles.text}>Home</div>
                        </div>
                        <div
                            className={styles.forwardLink}
                            onClick={() => this.handleClick('/portfolio')}
                        >
                            <div className={styles.text}>Portfolio</div>
                            <img src={Arrow} alt="arrow" className={styles.arrow} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Bio;
