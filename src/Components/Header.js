import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import logo from '../assets/logo.svg'
import backImg from '../assets/ic_webBack@2x.png'
import mapImg from '../assets/icon_map@2x.png'

const StyledHeader = styled.header`
    align-items: center;
    background: #43e895;
    display: flex;
    height: 80px;
    justify-content: space-around;
    padding-top: 50px;
    padding-bottom: 20px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 3;
    @media (min-width: 640px) {
        height: 80px;
    }
`

const Logo = styled.img`
    height: 17px;
    @media (min-width: 640px) {
        height: 50px;
    }
`
const Image = styled.img`
    height: 30px;
    padding-bottom: 5px;
    @media (min-width: 640px) {
        height: 50px;
    }
`
const Anchor = styled.a`
    color: #2a2a2a;
    text-decoration: none;
`

export default function Header({ isMobile, details, detailIsRendered }) {
    const mapsLink = () => {
        let locationString = ''
        if (details !== null && detailIsRendered) {
            const lat = details.location.lat
            const lng = details.location.lng
            locationString = `?daddr=${lat},${lng}&amp;ll=`
        }

        navigator.platform.indexOf('iPhone') !== -1 ||
        navigator.platform.indexOf('iPad') !== -1
            ? window.open(`maps://maps.google.com/maps${locationString}`)
            : window.open(`https://maps.google.com/maps${locationString}`)
    }

    return (
        <StyledHeader>
            <Link to={process.env.PUBLIC_URL + '/'}>
                {isMobile &&
                    detailIsRendered && (
                        <Image src={backImg} alt="Back Button" />
                    )}
            </Link>
            <Link to={process.env.PUBLIC_URL + '/'}>
                <Logo src={logo} className="App-logo" alt="logo" />
            </Link>

            <Anchor
                onClick={() => {
                    mapsLink()
                }}
            >
                <Image
                    src={mapImg}
                    alt="Link to Maps"
                />
            </Anchor>
        </StyledHeader>
    )
}

Header.propTypes = {
    detailIsRendered: PropTypes.bool,
    details: PropTypes.object,
    isMobile: PropTypes.bool
}
