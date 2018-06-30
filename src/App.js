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
        restaurants: {},
        lookupTable: {}
    }
    componentWillMount = () => {
        this.updateDimensions()
        this.getRestaurants()
        window.addEventListener('resize', this.updateDimensions)
    }

    componentWillUnmount = () => {
        window.removeEventListener('resize', this.updateDimensions)
    }

    createLookupTable = () => {
        const lookupTable = this.state.restaurants.reduce((obj, item) => {
            obj[slugify(item.name)] = item.name
            return obj
        }, {})
        this.setState({ lookupTable })
    }

    detailIsRendered = detailIsRendered => {
        this.setState({ detailIsRendered })
    }

    getCurrentRestaurant = id => {
        if (
            this.state.restaurants.length > 0 &&
            this.state.lookupTable.length > 0
        ) {
            const details = this.state.restaurants.find(e => {
                return e.name === this.state.lookupTable[id]
            })
            this.setState({ details })
        } else {
            this.getRestaurants().then(() => {
                const details = this.state.restaurants.find(e => {
                    return e.name === this.state.lookupTable[id]
                })
                this.setState({ details })
            })
        }
    }

    getRestaurants = async () => {
        if (localStorage.getItem('restaurants')) {
            try {
                const restaurants = JSON.parse(
                    localStorage.getItem('restaurants')
                )
                this.setState({ ...restaurants }, () => {
                    this.createLookupTable()
                })
            } catch (error) {
                console.error(error)
            }
        } else {
            const res = await fetch(
                'https://s3.amazonaws.com/br-codingexams/restaurants.json'
            )
            const restaurants = await res.json()
            this.setState({ ...restaurants }, () => {
                this.createLookupTable()
            })
            localStorage.setItem('restaurants', JSON.stringify(restaurants))
        }
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
            <Router>
                <div className="App">
                    <Header />
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
                                        detailIsRendered={this.detailIsRendered}
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
