import { Link } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'

import logo from './assets/logo.svg'

const StyledHeader = styled.header`
    background: #43e895;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    padding-top: 10px;
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
        <StyledHeader className="App-header">
            <Link to={process.env.PUBLIC_URL + '/'}>
                <Image src={logo} className="App-logo" alt="logo" />
            </Link>
        </StyledHeader>
    )
}

export default Header
