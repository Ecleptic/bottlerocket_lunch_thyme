import {
    GET_RESTAURANTS,
    GET_CURRENT_RESTAURANT,
    GET_WINDOW_SIZE,
    slugify
} from "./actions"
import Restaurant from "./Restaurant"

const initialState = {
    restaurants: [],
    lookupTable: {},
    windowHeight: "",
    windowWidth: ""
}

export default function(state = initialState, action) {
    const { type, data } = action
    switch (type) {
        case GET_RESTAURANTS:
            console.log("b")
            const lookupTable = data.restaurants.reduce(function(obj, item) {
                obj[slugify(item.name)] = item.name
                return obj
            }, {})
            return {
                ...state,
                restaurants: data,
                lookupTable
            }
        case GET_CURRENT_RESTAURANT:
            console.log("GETTING CURRENT RESTAURANT")
            console.log(data)
            break

        default:
            return state
    }
}
