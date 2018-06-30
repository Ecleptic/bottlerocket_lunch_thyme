import PropTypes from 'prop-types'
import React from 'react'

import Restaurant from './Restaurant'
import slugify from '../../Utils/slugify'

const RestaurantList = ({ restaurants }) => {
    return (
        <div className="restaurantList">
            {restaurants &&
                restaurants.length > 1 &&
                restaurants.map((restaurant, index) => {
                    const slug = slugify(restaurant.name)
                    return (
                        <Restaurant
                            key={index}
                            restaurant={restaurant}
                            slug={slug}
                        />
                    )
                })}
        </div>
    )
}

export default RestaurantList

RestaurantList.propTypes = {
    restaurants: PropTypes.array
}
