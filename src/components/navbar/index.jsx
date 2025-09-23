import React from 'react';
import LogoImgFile from '../assets/autoTicketLogo.png';
import styled from 'styled-components';
import {NavLinks} from './navlinks';
import Accessibility from './accessibility';

const NavBarContainer = styled.div`
    width: 100%;
    height: 60px;
    box-shadow:0 1px 3px rgba(15, 15, 15, 0.13);
    display: flex;
    align-items:center;
    padding: 0 1.5em;
    background-color: #1c3423;
`;

const LeftSection = styled.div`
    display: flex;
`;

const MiddleSection = styled.div`
    display: flex;
    flex: 2;
    height: 100%;
    justify-content: center;
    align-items: center;
    gap: 2em;
`;

const NavLogo = styled.img`
    width: 70px;
    height: 60px;
`;

const RightSection = styled.div`
    display: flex;
`;

export default function NavBar({ onLogout }){
    return <NavBarContainer>
        <LeftSection>
            <NavLogo src={LogoImgFile} alt="AutoTicket" />
        </LeftSection>
        <MiddleSection>
            <NavLinks />
        </MiddleSection>
        <RightSection>
             <Accessibility onLogout={onLogout} />
        </RightSection>
    </NavBarContainer>
}