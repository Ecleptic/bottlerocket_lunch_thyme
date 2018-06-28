import { Link } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'

import logo from './assets/logo.svg'

const StyledHeader = styled.header`
    align-items: center;
    background: #43e895;
    display: flex;
    height: 50px;
    justify-content: center;
    padding-top: 10px;
    position: fixed;
    top:0;
    width: 100%;
    z-index: 3;
    @media (min-width: 640px) {
        height: 80px;
    }
`

const Image = styled.img`
    height: 17px;

    @media (min-width: 640px) {
        height: 50px;
    }
`

const Header = () => {
    return (
        <StyledHeader>
            <Link to={process.env.PUBLIC_URL + '/'}>
                <Image src={logo} className="App-logo" alt="logo" />
            </Link>
        </StyledHeader>
    )
}

export default Header
