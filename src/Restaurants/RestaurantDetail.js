import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import MapContainer from "../Maps/MapContainer"
// import { getCurrentRestaurant } from "./actions"
import styled from "styled-components"

class RestaurantDetail extends Component {
    state = {
        details: {}
    }

    getCurrentRestaurant = () => {
        const details = this.props.restaurants.restaurants.find(e => {
            return e.name === this.props.lookupTable[this.props.match.params.id]
        })
        this.setState({ details })
    }

    componentDidUpdate(nextProps) {
        if (nextProps.match.params.id !== this.props.match.params.id) {
            this.getCurrentRestaurant()
        }
    }
    componentWillMount() {
        console.log(this.state)
        this.getCurrentRestaurant()
        this.props.detailIsRendered(true)
    }
    componentWillUnmount() {
        this.props.detailIsRendered(false)
    }

    render() {
        const originFontSize = 12

        const TitleDiv = styled.div`
            background: #34b379;
            color: #ffffff;
            margin: 0;
            /* padding: 1rem; */
            height: 60px /* 80px*/;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-left: 12px;
            h1 {
                font-size: /*${16 * 1.6}*/16px;
                font-weight: bold;
            }
            h3 {
                font-size: /*${12 * 1.6}*/12px;
                /* font-size: 12px; */
            }
        `
        const RestaurantInfo = styled.div`
            padding: 16px;
            p {
                margin-bottom: 26px;
            }
        `
        const mapSize = {  height: "300px" }
        if (this.state.details) {
            return (
                <div style={mapSize, {width: "100%"}}>
                    <div style={mapSize}>
                        {this.state.details.location && (
                            <MapContainer
                                style={mapSize}
                                lat={this.state.details.location.lat}
                                lng={this.state.details.location.lng}
                                info={{
                                    name: this.state.details.name,
                                    address: this.state.details.formattedAddress
                                }}
                            />
                        )}
                    </div>
                    <TitleDiv>
                        <h1>{this.state.details.name}</h1>
                        <h3>{this.state.details.category}</h3>
                    </TitleDiv>

                    <RestaurantInfo>
                        {this.state.details.location && (
                            <p>
                                {this.state.details.location.address}
                                <br />
                                {this.state.details.location.city}
                                {", "}
                                {this.state.details.location.state}{" "}
                                {this.state.details.location.postalCode}
                            </p>
                        )}

                        {this.state.details.contact && (
                            <p>{this.state.details.contact.formattedPhone}</p>
                        )}
                        {this.state.details.contact &&
                            // even if there's contact info, they might not have a twitter handle
                            this.state.details.contact.twitter && (
                                <p>@{this.state.details.contact.twitter}</p>
                            )}
                    </RestaurantInfo>
                </div>
            )
        } else {
            return null
        }
    }
}
const mapStateToProps = state => ({
    lookupTable: state.restaurants.lookupTable,
    restaurants: state.restaurants.restaurants
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            // getCurrentRestaurant
        },
        dispatch
    )

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RestaurantDetail)
