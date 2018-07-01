import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React, { Component } from 'react'

import Header from './Components/Header'
import RenderList from './Components/RenderList'
import RestaurantDetail from './Components/Restaurants/RestaurantDetail'
import slugify from './Utils/slugify'

class App extends Component {
    state = {
        detailIsRendered: false,
        isMobile: true,
        details: {},
        restaurants: [],
        lookupTable: {}
    }

    componentWillMount = async () => {
        const isMobile = this.isMobile()
        const restaurants = await this.getRestaurants()
        const lookupTable = await this.createLookupTable(restaurants)

        this.setState({ isMobile, restaurants, lookupTable })

        localStorage.setItem('restaurants', JSON.stringify(restaurants))

        window.addEventListener('resize', this.watchResize)
    }

    componentWillUnmount = () => {
        window.removeEventListener('resize', this.watchResize)
    }

    watchResize = () => {
        const isMobile = this.isMobile()
        this.setState({ isMobile })
    }

    createLookupTable = restaurants => {
        const lookupTable = restaurants.reduce((obj, item) => {
            obj[slugify(item.name)] = item.name
            return obj
        }, {})
        return lookupTable
    }

    setRenderedDetail = detailIsRendered => {
        this.setState({ detailIsRendered })
    }

    getCurrentRestaurant = async id => {
        if (
            this.state.restaurants.length > 0 &&
            this.state.lookupTable.length > 0
        ) {
            const details = this.state.restaurants.find(e => {
                return e.name === this.state.lookupTable[id]
            })
            this.setState({ details })
        } else {
            const restaurants = await this.getRestaurants()
            const lookupTable = await this.createLookupTable(restaurants)
            const details = await restaurants.find(e => {
                return e.name === lookupTable[id]
            })
            this.setState({ details })
        }
    }

    getRestaurants = async () => {
        if (localStorage.getItem('restaurants')) {
            try {
                const restaurants = JSON.parse(
                    localStorage.getItem('restaurants')
                )
                return restaurants
            } catch (error) {
                console.error(error)
            }
        } else {
            const res = await fetch(
                'https://s3.amazonaws.com/br-codingexams/restaurants.json'
            )
            const restaurants = await res.json()
            return restaurants.restaurants
        }
    }

    isMobile = () =>
        window.matchMedia('(min-width: 640px)').matches ? false : true

    render() {
        return (
            <Router>
                <div className="App">
                    <Header
                        detailIsRendered={this.state.detailIsRendered}
                        isMobile={this.state.isMobile}
                        details={this.state.details}
                    />
                    <div className="appContainer">
                        <RenderList
                            detailIsRendered={this.state.detailIsRendered}
                            isMobile={this.state.isMobile}
                            getRestaurants={this.getRestaurants}
                            restaurants={this.state.restaurants}
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
                                        setRenderedDetail={
                                            this.setRenderedDetail
                                        }
                                        getCurrentRestaurant={
                                            this.getCurrentRestaurant
                                        }
                                        details={this.state.details}
                                    />
                                )}
                            />
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}

export default App
