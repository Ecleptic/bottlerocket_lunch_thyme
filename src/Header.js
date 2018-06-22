import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import logo from "./assets/logo.svg"

const HeaderDiv = styled.header`
    background: #43e895;
    padding-top: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    padding-top: 10px;
    @media (max-width: 640px) {
        height: 50px;
    }
`
const Image = styled.img`
    height: 50px;

    @media (max-width: 640px) {
        height: 17px;
    }
`

const Header = () => {
    return (
        <HeaderDiv className="App-header">
            <Link to="/">
                <Image src={logo} className="App-logo" alt="logo" />
            </Link>
        </HeaderDiv>
    )
}

export default Header
