import React from 'react'
import { HashRouter, Route, Switch, useLocation } from 'react-router-dom'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import { Provider } from 'react-redux'
import store from './store'
import s from './App.scss'
import Home from './components/@pages/Home/Home'
import NotFound from './components/@pages/NotFound/NotFound'
import Header from './components/@shared/Header/Header'
import classnames from './utils/classnames'
import About from './components/@pages/About/About'
import Details from './components/@pages/Details/Details'
import Link from './links'

const cx = classnames.bind(s)

const CSSTransitionClassName = (className: string): typeof classes => {
    const classes = {
        enter: cx(`${className}-enter`),
        enterActive: cx(`${className}-enter-active`),
        enterDone: cx(`${className}-enter-done`),
        exit: cx(`${className}-exit`),
        exitActive: cx(`${className}-exit-active`),
        exitDone: cx(`${className}-exit-done`),
    }
    return classes
}

const AppComponent: React.FC = () => {
    const location = useLocation()

    return (
        <div className={cx('App')}>
            <div className={cx('head')}>
                <Header />
            </div>
            <div className={cx('body')}>
                <SwitchTransition>
                    <CSSTransition
                        classNames={CSSTransitionClassName('AnimationRoute')}
                        key={location.pathname}
                        timeout={150}
                        unmountOnExit
                        mountOnEnter
                    >
                        <Switch location={location}>
                            <Route
                                exact
                                path={Link.route('home')}
                                component={Home}
                            />
                            <Route
                                exact
                                path={Link.route('about')}
                                component={About}
                            />
                            <Route
                                path={Link.route('details')}
                                component={Details}
                            />
                            <Route path="*" component={NotFound} />
                        </Switch>
                    </CSSTransition>
                </SwitchTransition>
            </div>
        </div>
    )
}

export default function App(): JSX.Element {
    return (
        <Provider store={store}>
            <HashRouter>
                <AppComponent />
            </HashRouter>
        </Provider>
    )
}
