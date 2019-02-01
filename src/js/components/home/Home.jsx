import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styles from 'SCSS/home/home.scss';

// Assets
import Arrow from 'SVG/red-arrow.svg';

const Home = ({ handleClick }) => (
    <div className={styles.home}>
        <div className={styles.content}>
            <div className={styles.leftCol}>
                <div className={styles.header}>
                    Hello.
                </div>
                <div className={styles.blurb}>
                    My name is Graham von Oehsen. I am a software engineer, designer, and
                    musician based in Cambridge, MA.
                </div>
                <div className={styles.divider} />
            </div>
            <div className={styles.rightCol}>
                <div className={styles.links}>
                    <div onClick={() => handleClick('/bio')} className={styles.link}>
                        <div className={styles.text}>Bio</div>
                        <img src={Arrow} alt="arrow" className={styles.arrow} />
                    </div>
                    <div onClick={() => handleClick('/portfolio')} className={styles.link}>
                        <div className={styles.text}>Portfolio</div>
                        <img src={Arrow} alt="arrow" className={styles.arrow} />
                    </div>
                    <a
                        href="https://dribbble.com/grahamvo"
                        target="__blank"
                        className={styles.link}
                    >
                        <div className={styles.text}>Dribbble</div>
                        <img src={Arrow} alt="arrow" className={styles.arrow} />
                    </a>
                    <a href="https://github.com/grahamvo" target="__blank" className={styles.link}>
                        <div className={styles.text}>GitHub</div>
                        <img src={Arrow} alt="arrow" className={styles.arrow} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/graham-von-oehsen-2067b776/"
                        target="__blank"
                        className={styles.link}
                    >
                        <div className={styles.text}>LinkedIn</div>
                        <img src={Arrow} alt="arrow" className={styles.arrow} />
                    </a>
                    <a href="mailto:grahamvo@gmail.com" className={styles.link}>
                        <div className={styles.text}>Contact</div>
                        <img src={Arrow} alt="arrow" className={styles.arrow} />
                    </a>
                </div>
            </div>
        </div>
    </div>
);

Home.propTypes = {
    handleClick: PropTypes.func.isRequired,
};

export default Home;
