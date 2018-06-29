import React from 'react'

import RestaurantList from './Restaurants/RestaurantList'

const RenderList = ({ detailIsRendered, isMobile, getRestaurants }) => {
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

export default RenderList
