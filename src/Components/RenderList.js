import PropTypes from 'prop-types'
import React from 'react'

import RestaurantList from './Restaurants/RestaurantList'

export default function  RenderList ({ detailIsRendered, isMobile, restaurants }) {
    if (!isMobile) {
        return <RestaurantList restaurants={restaurants} />
    } else {
        if (!detailIsRendered) {
            return <RestaurantList restaurants={restaurants} />
        } else {
            return null
        }
    }
}


RenderList.propTypes = {
    detailIsRendered: PropTypes.bool,
    isMobile: PropTypes.bool,
    restaurants: PropTypes.array
}
