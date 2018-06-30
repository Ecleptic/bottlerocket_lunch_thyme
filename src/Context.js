// import React, { Component } from 'react'

// export const MyContext = React.createContext()

// export class MyProvider extends Component {
//     state = {
//         currentRestaurant: '',
//         detailIsRendered: false,
//         isMobile: true,
//         details: {},
//         restaurants: {},
//         lookupTable: {}
//     }

//     componentWillMount = () => {
//         this.updateDimensions()
//         this.getRestaurants()
//         window.addEventListener('resize', this.updateDimensions)
//     }

//     componentWillUnmount = () => {
//         window.removeEventListener('resize', this.updateDimensions)
//     }

//     createLookupTable = () => {
//         const lookupTable = this.state.restaurants.reduce((obj, item) => {
//             obj[this.slugify(item.name)] = item.name
//             return obj
//         }, {})
//         this.setState({ lookupTable })
//     }

//     detailIsRendered = detailIsRendered => {
//         this.setState({ detailIsRendered })
//     }

//     getCurrentRestaurant = id => {
//         if (
//             this.state.restaurants.length > 0 &&
//             this.state.lookupTable.length > 0
//         ) {
//             const details = this.state.restaurants.find(e => {
//                 return e.name === this.state.lookupTable[id]
//             })
//             this.setState({ details })
//         } else {
//             this.getRestaurants().then(() => {
//                 const details = this.state.restaurants.find(e => {
//                     return e.name === this.state.lookupTable[id]
//                 })
//                 this.setState({ details })
//             })
//         }
//     }

//     getRestaurants = async () => {
//         if (localStorage.getItem('restaurants')) {
//             try {
//                 const restaurants = JSON.parse(
//                     localStorage.getItem('restaurants')
//                 )
//                 this.setState({ ...restaurants }, () => {
//                     this.createLookupTable()
//                 })
//             } catch (error) {
//                 console.error(error)
//             }
//         } else {
//             const res = await fetch(
//                 'https://s3.amazonaws.com/br-codingexams/restaurants.json'
//             )
//             const restaurants = await res.json()
//             this.setState({ ...restaurants }, () => {
//                 this.createLookupTable()
//             })
//             localStorage.setItem('restaurants', JSON.stringify(restaurants))
//         }
//     }

//     slugify = text => {
//         const specialChars = 'àáäãâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
//         const normalChars = 'aaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
//         const splitAccents = new RegExp(specialChars.split('').join('|'), 'g')

//         return text
//             .toString()
//             .toLowerCase()
//             .replace(splitAccents, a =>
//                 normalChars.charAt(specialChars.indexOf(a))
//             )
//             .replace(/\s+/g, '-')
//             .replace(/[^\w\-]+/g, '') // eslint-disable-line no-useless-escape
//     }

//     updateDimensions = () => {
//         if (window.matchMedia('(min-width: 640px)').matches) {
//             this.setState({ isMobile: false })
//         } else {
//             this.setState({ isMobile: true })
//         }
//     }

//     render() {
//         return (
//             <MyContext.Provider
//                 value={{
//                     state: this.state,
//                     getRestaurants: () => this.getRestaurants(),
//                     getCurrentRestaurant: id => this.getCurrentRestaurant(id),
//                     detailIsRendered: detail => this.detailIsRendered(detail),
//                     slugify: url => this.slugify(url)
//                 }}
//             >
//                 {this.props.children}
//             </MyContext.Provider>
//         )
//     }
// }