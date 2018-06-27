export const GET_RESTAURANTS = 'GET_RESTAURANTS'
export const GET_WINDOW_SIZE = 'GET_WINDOW_SIZE'

export function getRestaurants() {
    return async function(dispatch) {
        const res = await fetch(
            'https://s3.amazonaws.com/br-codingexams/restaurants.json'
        )
        const restaurants = await res.json()
        return dispatch({
            type: 'GET_RESTAURANTS',
            data: restaurants
        })
    }
}

/**
 * @returns {slug}
 * @param {string} text
 * gets text, makes lowercase, kebab-case,
 * and removes apostrophes to use in url
 */
export const slugify = text => {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '') // eslint-disable-line no-useless-escape
}
