import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import firebase from 'firebase/app';

import App from 'Components/App';

const nodeEnv = process.env.NODE_ENV;

if (nodeEnv === 'production') {
    const config = {
        apiKey: 'AIzaSyCIDgdjn7L1ZIU2eqG0SsLReNsQb6eQJt8',
        authDomain: 'personal-website-d69d8.firebaseapp.com',
        // databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
        storageBucket: 'personal-website-d69d8.appspot.com',
    };
    firebase.initializeApp(config);
}

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Router>
                <Component />
            </Router>
        </AppContainer>,
        document.getElementById('root'),
    );
};

if (nodeEnv === 'production') {
    render(withRouter(App));
} else {
    render(withRouter(App));
}

if (module.hot) {
    const orgError = console.error; // eslint-disable-line no-console
    console.error = (message) => { // eslint-disable-line no-console
        if (message && message.indexOf('You cannot change <Router routes>;') === -1) {
            orgError.apply(console, [message]);
        }
    };
    module.hot.accept('Components/App', () => { render(App); });
}
