import React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

const NavLinksContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
`;

const LinksWrapper = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    height: 100%;
    list-style: none;
    gap: 1.5rem;
`;

const LinkItem = styled.li`
    height: 100%;
    padding: 0 1.1em;
    color: #222;
    font-weight: 500;
    font-size: 14px;
    align-items: center;
    justify-content: center;
    display: flex;
    border-top: 2px solid transparent;
    transition: all 200ms ease-in-out;
    &:hover {
        border-bottom: 2px solid #2ecc71;
    }
`;

const StyledLink = styled(RouterLink)`
    text-decoration: none;
    color: inherit;
    font-size: inherit;
    display: flex;
    color: #2ecc71;
`;

export function NavLinks(props) {
    return (
        <NavLinksContainer>
            <LinksWrapper>
                <LinkItem><StyledLink to = "/">Home</StyledLink></LinkItem>
                <LinkItem><StyledLink to = "/vehicles"> Vehicles </StyledLink></LinkItem>
                <LinkItem><StyledLink to="/reservations"> Reservations </StyledLink></LinkItem>
                <LinkItem><StyledLink to="/parking-lots"> Parking Lots </StyledLink></LinkItem>
                <LinkItem><StyledLink to="/tickets" > Tickets </StyledLink></LinkItem>
            </LinksWrapper>
        </NavLinksContainer>
    );
}