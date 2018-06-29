import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { MyContext } from '../../Context'
import MapContainer from '../Maps/MapContainer'
import styled from 'styled-components'

export default class RestaurantDetail extends Component {
    componentWillMount() {
        this.props.detailIsRendered(true)
        this.props.getCurrentRestaurant(this.props.match.params.id)
    }

    componentDidUpdate(nextProps) {
        if (nextProps.match.params.id !== this.props.match.params.id) {
            this.props.getCurrentRestaurant(this.props.match.params.id)
        }
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
                padding-top: 80px;
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

        return (
            <MyContext.Consumer>
                {context =>
                    context.state.details ? (
                        <ParentDiv context={context}>
                            <TitleDiv>
                                <h1>{context.state.details.name}</h1>
                                <h3>{context.state.details.category}</h3>
                            </TitleDiv>

                            <div style={{ height: '300px', order: -1 }}>
                                {context.state.details.location && (
                                    <MapContainer
                                        style={{ height: '300px' }}
                                        lat={context.state.details.location.lat}
                                        lng={context.state.details.location.lng}
                                        info={{
                                            name: context.state.details.name,
                                            address:
                                                context.state.details
                                                    .formattedAddress
                                        }}
                                    />
                                )}
                            </div>

                            <RestaurantInfo>
                                {context.state.details.location && (
                                    <p>
                                        {context.state.details.location.address}
                                        <br />
                                        {context.state.details.location.city} ,
                                        {context.state.details.location.state}
                                        {
                                            context.state.details.location
                                                .postalCode
                                        }
                                    </p>
                                )}

                                {context.state.details.contact && (
                                    <a
                                        href={`tel:${
                                            context.state.details.contact
                                                .formattedPhone
                                        }`}
                                    >
                                        <p>
                                            {
                                                context.state.details.contact
                                                    .formattedPhone
                                            }
                                        </p>
                                    </a>
                                )}

                                {context.state.details.contact &&
                                    context.state.details.contact.twitter && (
                                        <Anchor
                                            target="_blank"
                                            href={`https://twitter.com/${
                                                context.state.details.contact
                                                    .twitter
                                            }`}
                                        >
                                            <p>
                                                @{
                                                    context.state.details
                                                        .contact.twitter
                                                }
                                            </p>
                                        </Anchor>
                                    )}
                            </RestaurantInfo>
                        </ParentDiv>
                    ) : null
                }
            </MyContext.Consumer>
        )
    }
}

RestaurantDetail.propTypes = {
    detailIsRendered: PropTypes.func,
    getCurrentRestaurant: PropTypes.func,
    match: PropTypes.array
}
