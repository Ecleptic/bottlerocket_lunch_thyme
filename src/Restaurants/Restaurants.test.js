import React from "react"
import ReactDOM from "react-dom"
import RestaurantList from "./RestaurantList"

it("renders without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<RestaurantList />, div)
})
