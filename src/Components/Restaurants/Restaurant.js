import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'

const Restaurant = ({ restaurant, slug }) => {
    const categoryTitleStyles = `color: #ffffff;
        font-size: 20px;
        margin-bottom: 10px;
        margin-top: 10px;
        padding-left: 12px;
        position: absolute;
        text-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
        z-index: 2;`

    const Title = styled.h2`
        bottom: 24px;
        font-weight: bold;
        ${categoryTitleStyles};
    `
    const Category = styled.p`
        bottom: 6px;
        ${categoryTitleStyles};
    `

    const StyledLink = styled(Link)`
        display: block;
        height: 180px;
        overflow: hidden;
        position: relative;
        width: 100%;
        @media (min-width: 640px) {
            height: auto;
        }
    `

    const Gradient = styled.div`
        bottom: 0;
        display: flex;
        height: 180px;
        width: 100%;
        z-index: 1;
        background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0) 10%,
            rgba(0, 0, 0, 0) 10%,
            rgba(0, 0, 0, 0.65) 80%
        );
        @media (min-width: 640px) {
            height: auto;
        }
    `

    const Image = styled.img`
        height: 180px;
        left: 0;
        position: relative;
        top: 0;
        width: 100%;
        z-index: -1;
        @media (min-width: 640px) {
            height: auto;
        }
    `

    return (
        <StyledLink to={slug}>
            <Gradient>
                <Image
                    src={restaurant.backgroundImageURL}
                    alt={restaurant.name}
                />
                <Title>{restaurant.name}</Title>
                <Category>{restaurant.category}</Category>
            </Gradient>
        </StyledLink>
    )
}

export default Restaurant

Restaurant.propTypes = {
    restaurant: PropTypes.object
}
