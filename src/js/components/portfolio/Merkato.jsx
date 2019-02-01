import React from 'react';
import { Element } from 'react-scroll';

// Styles
import styles from 'SCSS/portfolio/content.scss';

const Merkato = () => (
    <Element className={styles.container} name="Merkato">
        <div className={styles.title}>Merkato</div>
        <div className={styles.divider} />
        <div className={styles.paragraph}>
            My most consistent freelance gig has been for a company called Merkato. They are an
            marketing group that handles Amazon presence for companies that do $50M to $100M in
            sales each year.
        </div>
        <div className={styles.paragraph}>
            I’ve completed two large projects for them over 2018 and early 2019. My primary goal
            both times was to modernize the site to give the agency more credibility.
        </div>
        <div className={styles.paragraph}>
            I worked closely with the client to make sure everything I did was what
            they were looking for. I made sure to do research on competitors and similar
            industry websites.
        </div>
        <div className={styles.paragraph}>
            Since their initial design was full of stock images and inconsistent color
            choices, my first step was to create a color palette and determine what the brand
            identity should be. The first project I completed utilized a dark, angular theme,
            whereas the second redesign was lighter, still angular, and utilized gradients to add
            interest. I also created new vector graphics and icons to go along with the new feel.
        </div>
        <div className={styles.paragraph}>
            I designed both desktop and mobile versions of the website, complete
            with custom graphics and components.
        </div>
    </Element>
);

export default Merkato;
