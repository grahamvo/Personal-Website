import React from 'react';
import { Element } from 'react-scroll';

// Styles
import styles from 'SCSS/portfolio/content.scss';

const Personal = () => (
    <Element className={styles.container} name="Personal">
        <div className={styles.title}>Personal Work</div>
        <div className={styles.divider} />
        <div className={styles.paragraph}>
            When I have free time (not that I have very much) I like to work on
            various personal projects.
        </div>
        <div className={styles.paragraph}>
            These are a few examples of things that I’ve designed and built over the years.
        </div>
        <div className={styles.paragraph}>
            Thanks for looking!
        </div>
        <div className={styles.bottom} />
    </Element>
);

export default Personal;
