import React from 'react'

import App from '../../App'
import Restaurant from './Restaurant'
import RestaurantDetail from './RestaurantDetail'
import RestaurantList from './RestaurantList'
import Header from '../Header'

describe('All View components match snapshots', () => {
    it('matches the snapshot', () => {
        const app = <App />
        expect(app).toMatchSnapshot()
    })

    it('matches the snapshot', () => {
        const list = <RestaurantList />
        expect(list).toMatchSnapshot()
    })

    it('matches the snapshot', () => {
        const RestaurantComponent = <Restaurant />
        expect(RestaurantComponent).toMatchSnapshot()
    })

    it('matches the snapshot', () => {
        const detail = <RestaurantDetail />
        expect(detail).toMatchSnapshot()
    })
    it('matches the snapshot', () => {
        const head = <Header />
        expect(head).toMatchSnapshot()
    })
})
