import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component } from 'react'

import MapContainer from '../Maps/MapContainer'
import styled from 'styled-components'

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
        this.getCurrentRestaurant()
        this.props.detailIsRendered(true)
    }

    componentWillUnmount() {
        this.props.detailIsRendered(false)
    }

    render() {
        const ParentDiv = styled.div`
            height: 300;
            width: 100%;
            display: flex;
            flex-direction: column;
            padding-top: 50px;
            @media (min-width: 640px) {
                height: 80px;
            }
        `

        const TitleDiv = styled.div`
            background: #34b379;
            color: #ffffff;
            margin: 0;
            height: 60px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-left: 12px;
            h1 {
                font-size: 16px;
                font-weight: bold;
            }
            h3 {
                font-size: 12px;
            }
        `
        const RestaurantInfo = styled.div`
            padding: 16px;
            p {
                margin-bottom: 26px;
            }
        `
        const Anchor = styled.a`
            color: #2a2a2a;
            text-decoration: none;
        `

        if (this.state.details) {
            return (
                <ParentDiv>
                    <TitleDiv>
                        <h1>{this.state.details.name}</h1>
                        <h3>{this.state.details.category}</h3>
                    </TitleDiv>

                    <div style={{ height: '300px', order: -1 }}>
                        {this.state.details.location && (
                            <MapContainer
                                style={{ height: '300px' }}
                                lat={this.state.details.location.lat}
                                lng={this.state.details.location.lng}
                                info={{
                                    name: this.state.details.name,
                                    address: this.state.details.formattedAddress
                                }}
                            />
                        )}
                    </div>

                    <RestaurantInfo>
                        {this.state.details.location && (
                            <p>
                                {this.state.details.location.address}
                                <br />
                                {this.state.details.location.city} ,
                                {this.state.details.location.state}
                                {this.state.details.location.postalCode}
                            </p>
                        )}

                        {this.state.details.contact && (
                            <a
                                href={`tel:${
                                    this.state.details.contact.formattedPhone
                                }`}
                            >
                                <p>
                                    {this.state.details.contact.formattedPhone}
                                </p>
                            </a>
                        )}

                        {this.state.details.contact &&
                            this.state.details.contact.twitter && (
                                <Anchor
                                    target="_blank"
                                    href={`https://twitter.com/${
                                        this.state.details.contact.twitter
                                    }`}
                                >
                                    <p>@{this.state.details.contact.twitter}</p>
                                </Anchor>
                            )}
                    </RestaurantInfo>
                </ParentDiv>
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
