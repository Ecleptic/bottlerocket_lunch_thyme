import React from 'react'

import { MyContext } from '../../Context'
import Restaurant from './Restaurant'

const RestaurantList = () => {
    return (
        <MyContext.Consumer>
            {context => (
                <div className="restaurantList">
                    {context.state.restaurants &&
                        context.state.restaurants.length > 1 &&
                        context.state.restaurants.map((restaurant, index) => {
                            const slug = context.slugify(restaurant.name)
                            return (
                                <Restaurant
                                    key={index}
                                    restaurant={restaurant}
                                    slug={slug}
                                />
                            )
                        })}
                </div>
            )}
        </MyContext.Consumer>
    )
}

export default RestaurantList
