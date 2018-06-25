import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Provider } from "react-redux"
import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import logger from "redux-logger"
import thunk from "redux-thunk"
import { save, load } from "redux-localstorage-simple"

import rootReducer from "./rootReducer"

import Header from "./Header"
import RestaurantList from "./Restaurants/RestaurantList"
import RestaurantDetail from "./Restaurants/RestaurantDetail"

const middleware = [logger, thunk]

const store = createStore(
    rootReducer,
    load(),
    composeWithDevTools(applyMiddleware(...middleware, save()))
)

class App extends Component {
    state = {
        windowHeight: "",
        windowWidth: "",
        detailIsRendered: false,
        currentRestaurant: ""
    }
    componentWillMount = () => {
        this.getWindowSize()
    }
    getWindowSize = () => {
        const windowWidth =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.documentElement.getElementsByTagName("body")[0].clientWidth
        const windowHeight =
            window.innerHeight ||
            document.documentElement.clientHeight ||
            document.documentElement.getElementsByTagName("body")[0]
                .clientHeight

        console.log(windowHeight, windowWidth)
        this.setState({ windowHeight, windowWidth })
    }

    detailIsRendered = detailIsRendered => {
        console.log("detailIsRendered", detailIsRendered)
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
                                windowWidth={this.state.windowWidth}
                            />
                            {!this.state.detailIsRendered &&
                                this.state.windowWidth > 640 && (
                                    <h1>Please Select a Restaurant</h1>
                                )}
                            <Switch>
                                <Route
                                    // exact
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

const RenderList = ({ detailIsRendered, windowWidth }) => {
    console.log(detailIsRendered, windowWidth)
    if (windowWidth > 640) {
        return <RestaurantList />
    } else if (windowWidth < 640) {
        if (!detailIsRendered) {
            return <RestaurantList />
        } else {
            return <h1 />
        }
    } else {
        return <h1>oops</h1>
    }
}

export default App
