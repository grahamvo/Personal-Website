import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';

// Components
import Header from 'Components/header/Header';
import Home from 'Components/home/Home';
import Bio from 'Components/bio/Bio';
import Portfolio from 'Components/portfolio/Portfolio';
import Cover from 'Components/Cover';
import Menu from 'Components/menu/Menu';

// Styles
import styles from 'SCSS/app.scss';

class App extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
    }

    state = {
        current: this.props.location.pathname, // eslint-disable-line
        next: null,
        menu: false,
    }

    componentDidMount() {
        window.addEventListener('popstate', this.handleNav);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    handleNav = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.handleClick(e.target.location.pathname);
    }

    toggleMenu = () => {
        const { menu } = this.state;
        this.setState({ menu: !menu });
    }

    handleClick = (next) => {
        const { menu } = this.state;
        const { history } = this.props;
        this.setState({ next });

        if (menu) {
            this.setState({ menu: false });
        }

        this.timeout = setTimeout(() => {
            history.push(next);
            this.setState({
                current: next,
                next: null,
            });
        }, 500);
    }

    render() {
        const { location } = this.props;
        const { current, next, menu } = this.state;

        return (
            <div className={styles.appBase}>
                <Header
                    location={location}
                    handleClick={this.handleClick}
                    next={next}
                    toggleMenu={this.toggleMenu}
                    enter={menu}
                />
                <Menu enter={menu} location={location} handleClick={this.handleClick} />
                <Cover current={current} next={next} />
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => <Home handleClick={this.handleClick} />}
                    />
                    <Route
                        exact
                        path="/bio"
                        render={() => <Bio handleClick={this.handleClick} next={next} />}
                    />
                    <Route
                        exact
                        path="/portfolio"
                        render={() => <Portfolio handleClick={this.handleClick} next={next} />}
                    />
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);
