import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { getRestaurants } from "./actions"
import Restaurant from "./Restaurant"

class RestaurantList extends Component {
    componentWillMount() {
        const { getRestaurants } = this.props
        getRestaurants()
    }
    componentDidMount() {}
    render() {
        const { restaurants } = this.props.restaurants
        return (
            <div className="restaurantList">
                {restaurants && restaurants.map((restaurant, index) => (
                    <Restaurant key={index} restaurant={restaurant} />
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    restaurants: state.restaurants.restaurants,
    windowWidth: state.windowHeight,
    windowHeight: state.windowWidth,
    currentRestaurant: state.restaurants.currentRestaurant

})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getRestaurants
        },
        dispatch
    )

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RestaurantList)
