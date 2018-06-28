import { GET_RESTAURANTS, slugify } from './actions'

const initialState = {
    restaurants: [],
    lookupTable: {}
}

export default function(state = initialState, action) {
    const { type, data } = action
    switch (type) {
        case GET_RESTAURANTS:
            const lookupTable = data.restaurants.reduce(function(obj, item) {
                obj[slugify(item.name)] = item.name
                return obj
            }, {})
            return {
                ...state,
                restaurants: data,
                lookupTable
            }
        default:
            return state
    }
}
