import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React, { Component } from 'react'

import { MyContext } from './Context'
import Header from './Components/Header'
import RenderList from './Components/RenderList'
import RestaurantDetail from './Components/Restaurants/RestaurantDetail'

class App extends Component {
    render() {
        return (
            <MyContext.Consumer>
                {context => (
                    <Router>
                        <div className="App">
                            <Header />
                            <div className="appContainer">
                                <RenderList
                                    detailIsRendered={
                                        context.state.detailIsRendered
                                    }
                                    isMobile={context.state.isMobile}
                                    getRestaurants={context.getRestaurants}
                                />
                                {!context.state.detailIsRendered &&
                                    !context.state.isMobile && (
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
                                                    context.detailIsRendered
                                                }
                                                getCurrentRestaurant={
                                                    context.getCurrentRestaurant
                                                }
                                            />
                                        )}
                                    />
                                </Switch>
                            </div>
                        </div>
                    </Router>
                )}
            </MyContext.Consumer>
        )
    }
}

export default App
