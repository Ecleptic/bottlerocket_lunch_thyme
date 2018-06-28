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

export const slugify = text => {
    const specialChars = 'àáäãâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
    const normalChars = 'aaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
    const splitAccents = new RegExp(specialChars.split('').join('|'), 'g')

    return text
        .toString()
        .toLowerCase()
        .replace(splitAccents, a => normalChars.charAt(specialChars.indexOf(a)))
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '') // eslint-disable-line no-useless-escape
}
