import PropTypes from 'prop-types'
import React from 'react'

import RestaurantList from './Restaurants/RestaurantList'

const RenderList = ({ detailIsRendered, isMobile, restaurants }) => {
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

export default RenderList

RenderList.propTypes = {
    detailIsRendered: PropTypes.bool,
    isMobile: PropTypes.bool,
    restaurants: PropTypes.array
}
