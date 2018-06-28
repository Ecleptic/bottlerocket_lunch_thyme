import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { getRestaurants, slugify } from '../Restaurants/actions'
import expectedResults from './expectedResults'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('get all the restaurant info', () => {
    const store = mockStore({
        restaurants: [],
        lookupTable: {}
    })
    it('it fetches restaurant info successfully', () => {
        return store.dispatch(getRestaurants()).then(res => {
            expect(res.data).toEqual(expectedResults)
            expect(store.getActions()[0].data).toEqual(expectedResults)
        })
    })
})

describe('creates slugs successfully', () => {
    expect(slugify('Flying Saucer Draught Emporium')).toEqual(
        'flying-saucer-draught-emporium'
    )
    expect(slugify('héllo there!')).toEqual('hello-there')
    expect(slugify('In-N-Out Burger')).toEqual('in-n-out-burger')
    expect(slugify("Chuy's")).toEqual('chuys')
    expect(slugify('100%_runs')).toEqual('100-runs')
})
