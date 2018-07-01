import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'

import MapContainer from '../Maps/MapContainer'

export default class RestaurantDetail extends Component {
    componentWillMount() {
        this.props.setRenderedDetail(true)
        this.props.getCurrentRestaurant(this.props.match.params.id)
    }

    componentDidUpdate(nextProps) {
        if (nextProps.match.params.id !== this.props.match.params.id) {
            this.props.getCurrentRestaurant(this.props.match.params.id)
        }
        const detailsDiv = document.getElementById('detailsDiv')
        detailsDiv.classList.remove('translateIn')
    }

    componentWillUnmount() {
        this.props.setRenderedDetail(false)
    }

    render() {
        const ParentDiv = styled.div`
            height: 300;
            width: 100%;
            display: flex;
            flex-direction: column;
            margin-top: 50px;
            transition: 1s ease-in-out;
            @media (min-width: 640px) {
                margin-top: 80px;
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
            h2 {
                font-size: 16px;
                font-weight: bold;
            }
            p {
                font-size: 12px;
                margin: 0;
                padding: 0;
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

        return this.props.details ? (
            <ParentDiv className="translateIn" id="detailsDiv">
                <TitleDiv>
                    <h2>{this.props.details.name}</h2>
                    <p>{this.props.details.category}</p>
                </TitleDiv>

                <div style={{ height: '300px', order: -1 }}>
                    {this.props.details.location && (
                        <MapContainer
                            style={{ height: '300px' }}
                            lat={this.props.details.location.lat}
                            lng={this.props.details.location.lng}
                            info={{
                                name: this.props.details.name,
                                address: this.props.details.formattedAddress
                            }}
                        />
                    )}
                </div>

                <RestaurantInfo>
                    {this.props.details.location && (
                        <p>
                            {this.props.details.location.address}
                            <br />
                            {this.props.details.location.city}
                            {', '}
                            {this.props.details.location.state}{' '}
                            {this.props.details.location.postalCode}
                        </p>
                    )}

                    {this.props.details.contact && (
                        <Anchor
                            href={`tel:${
                                this.props.details.contact.formattedPhone
                            }`}
                        >
                            <p>{this.props.details.contact.formattedPhone}</p>
                        </Anchor>
                    )}

                    {this.props.details.contact &&
                        this.props.details.contact.twitter && (
                            <Anchor
                                target="_blank"
                                href={`https://twitter.com/${
                                    this.props.details.contact.twitter
                                }`}
                            >
                                <p>@{this.props.details.contact.twitter}</p>
                            </Anchor>
                        )}
                </RestaurantInfo>
            </ParentDiv>
        ) : null
    }
}

RestaurantDetail.propTypes = {
    setRenderedDetail: PropTypes.func,
    getCurrentRestaurant: PropTypes.func,
    match: PropTypes.object,
    details: PropTypes.object
}
