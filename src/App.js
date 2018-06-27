import { applyMiddleware, createStore } from 'redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import { save, load } from 'redux-localstorage-simple'
import logger from 'redux-logger'
import React, { Component } from 'react'
import thunk from 'redux-thunk'

import Header from './Header'
import RestaurantDetail from './Restaurants/RestaurantDetail'
import RestaurantList from './Restaurants/RestaurantList'
import rootReducer from './rootReducer'

const middleware = [logger, thunk]

const store = createStore(
    rootReducer,
    load(),
    composeWithDevTools(applyMiddleware(...middleware, save()))
)

class App extends Component {
    state = {
        isMobile: true,
        windowHeight: '',
        windowWidth: '',
        detailIsRendered: false,
        currentRestaurant: ''
    }

    componentWillMount = () => {
        this.getWindowSize()
        this.updateDimensions()
        window.addEventListener('resize', this.updateDimensions)
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions)
    }

    updateDimensions = () => {
        if (window.matchMedia('(min-width: 640px)').matches) {
            /* the viewport is at least 400 pixels wide */
            this.setState({ isMobile: false })
            console.log('the viewport is at least 400 pixels wide ')
        } else {
            this.setState({ isMobile: true })
            /* the viewport is less than 400 pixels wide */
            console.log('the viewport is less than 400 pixels wide ')
        }
    }

    getWindowSize = () => {
        const windowWidth =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.documentElement.getElementsByTagName('body')[0].clientWidth
        const windowHeight =
            window.innerHeight ||
            document.documentElement.clientHeight ||
            document.documentElement.getElementsByTagName('body')[0]
                .clientHeight

        console.log(windowHeight, windowWidth)
        this.setState({ windowHeight, windowWidth })
    }

    detailIsRendered = detailIsRendered => {
        console.log('detailIsRendered', detailIsRendered)
        this.setState({ detailIsRendered })
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Header />
                        <div className="appContainer">
                            <RenderList
                                detailIsRendered={this.state.detailIsRendered}
                                // windowWidth={this.state.windowWidth}
                                isMobile={this.state.isMobile}
                            />
                            {!this.state.detailIsRendered &&
                                !this.state.isMobile && (
                                    <h1>Please Select a Restaurant</h1>
                                )}
                            <Switch>
                                <Route
                                    path={`${process.env.PUBLIC_URL}/:id`}
                                    render={props => (
                                        <RestaurantDetail
                                            {...props}
                                            detailIsRendered={
                                                this.detailIsRendered
                                            }
                                        />
                                    )}
                                />
                            </Switch>
                        </div>
                    </div>
                </Router>
            </Provider>
        )
    }
}

const RenderList = ({ detailIsRendered, isMobile }) => {
    if (!isMobile) {
        return <RestaurantList />
    } else {
        if (!detailIsRendered) {
            return <RestaurantList />
        } else {
            return null
        }
    }
}

export default App
