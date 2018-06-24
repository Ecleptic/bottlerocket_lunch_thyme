import { connect } from "react-redux"
import { Link } from "react-router-dom"
import React from "react"
import styled from "styled-components"

import { slugify } from "./actions"

const originHeight = 180
const originWidth = 320
const originFontSize = 12
const originMarginSize = 6

const Restaurant = ({ restaurant, windowWidth }) => {
    const computedWidth =
        windowWidth < 640
            ? `${100}%`
            : `${originWidth * 2}px` || `${originWidth * 1.6}px`

    const computedHeight =
        windowWidth < 640
            ? `${originHeight * 1}px`
            : `${originHeight * 2}px` || `${originHeight * 1.6}px`

    const StyledLink = styled(Link)`
        position: relative;
        display: block;
        overflow: hidden;
        width: ${computedWidth};
        height: ${computedHeight};
    `

    const Gradient = styled.div`
        display: inline-block;
        background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0) 10%,
            rgba(0, 0, 0, 0) 10%,
            rgba(0, 0, 0, 0.65) 80%
        );
        z-index: 1;
        height: ${computedHeight};
        width: ${computedWidth};
    `
    const Image = styled.img`
        position: relative;
        z-index: -1;
        top: 0;
        left: 0;
        height: ${computedHeight};
        width: ${computedWidth};
    `
    const Title = styled.p`
        position: absolute;
        bottom: ${originMarginSize * 4}px;
        color: #ffffff;
        text-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
        z-index: 2;
        font-weight: bold;
        font-size: ${originFontSize * 1.6}px;
        margin: ${originMarginSize * 1.6}px, 0;
        padding-left: 12px;
    `
    const Category = styled.p`
        position: absolute;
        bottom: ${originMarginSize}px;
        color: #ffffff;
        text-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
        z-index: 2;
        font-size: ${originFontSize * 1.6}px;
        margin: ${originMarginSize * 1.6}px, 0;
        padding-left: 12px;
    `

    const slug = slugify(restaurant.name)
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

const mapStateToProps = state => ({
    windowWidth: state.restaurants.windowHeight,
    windowHeight: state.restaurants.windowWidth
})

export default connect(mapStateToProps)(Restaurant)
