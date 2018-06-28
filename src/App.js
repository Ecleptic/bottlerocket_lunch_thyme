import { applyMiddleware, createStore } from 'redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import { save, load } from 'redux-localstorage-simple'
import logger from 'redux-logger'
import React, { Component } from 'react'
import thunk from 'redux-thunk'

import Header from './Components/Header'
import RestaurantDetail from './Components/Restaurants/RestaurantDetail'
import RestaurantList from './Components/Restaurants/RestaurantList'
import rootReducer from './rootReducer'

const middleware = [logger, thunk]

const store = createStore(
    rootReducer,
    load(),
    composeWithDevTools(applyMiddleware(...middleware, save()))
)

class App extends Component {
    state = {
        currentRestaurant: '',
        detailIsRendered: false,
        isMobile: true
    }

    componentWillMount = () => {
        this.updateDimensions()
        window.addEventListener('resize', this.updateDimensions)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions)
    }

    detailIsRendered = detailIsRendered => {
        console.log('detailIsRendered', detailIsRendered)
        this.setState({ detailIsRendered })
    }

    updateDimensions = () => {
        if (window.matchMedia('(min-width: 640px)').matches) {
            this.setState({ isMobile: false })
        } else {
            this.setState({ isMobile: true })
        }
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
                                isMobile={this.state.isMobile}
                            />
                            {!this.state.detailIsRendered &&
                                !this.state.isMobile && (
                                    <h1 style={{ paddingTop: '80px' }}>
                                        Please Select a Restaurant
                                    </h1>
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
