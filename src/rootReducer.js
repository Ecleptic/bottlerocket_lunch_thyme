import { combineReducers } from 'redux'

import restaurants from './Components/Restaurants/reducer'

const rootReducer = combineReducers({
    restaurants
})

export default rootReducer
