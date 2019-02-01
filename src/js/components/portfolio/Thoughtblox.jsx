import React from 'react';
import { Element } from 'react-scroll';

// Styles
import styles from 'SCSS/portfolio/content.scss';

const Thoughtblox = () => (
    <Element className={styles.container} name="Thoughtblox">
        <div className={styles.title}>Thoughtblox</div>
        <div className={styles.divider} />
        <div className={styles.paragraph}>
            For the past 2 years, I’ve been working as co-founder and Chief
            Product Officer of Thoughtblox.
        </div>
        <div className={styles.paragraph}>
            I am responsible for designing and engineering the entire front-end
            of the application. I created everything from the custom graphics
            on the home page, to each indiviual icon, to the basic mechanics
            and feel of the product. I worked alongside a back-end engineer to
            design a REST API from scratch to handle the needs of the platform.
        </div>
        <div className={styles.paragraph}>
            The stack I used for this project included React, React Router, Redux,
            Webpack, SCSS, Babel, and es2017. I created an automated deployment
            process with AWS and Cloudfront. I worked very hard to ensure that
            the packages were kept up to date and that we were always on the
            cutting edge.
        </div>
        <div className={styles.paragraph}>
            In addition to the browser application, I developed a desktop version,
            utilizing Electron and Typescript to create a polished experience
            with auto-updating and native notifications, among other features.
        </div>
    </Element>
);

export default Thoughtblox;
