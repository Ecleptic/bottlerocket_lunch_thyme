import { combineReducers } from "redux"

import restaurants from "./Restaurants/reducer"

const rootReducer = combineReducers({
    restaurants
})

export default rootReducer
