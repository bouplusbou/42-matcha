import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.section`
display: flex;
justify-content: space-between;
padding: 40px;
height: 30px;
background-color: #6F48BD;
`;
const LogoWrapper = styled(Link)`
text-decoration: none;
margin: 0;
display: flex;
align-items: center;
color: white;
font-size: 22px;
`;
const LoginButton = styled(Link)`
  display: flex;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 15px;
  width: 50px;
  height: 10px;
  text-align: center;
  border: solid 0.5px rgba(255, 255, 255, 0.56);
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.56);
  font-family: 'Roboto', sans-serif;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  &:hover {
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    background-color: white;
    color: #6F48BD;
  }
`;

const HeaderNotConnected = () => (
    <Header>
        <LogoWrapper to='/'>
          <img src={'./logo_color.svg'} width="50px" height="50px" alt=""/>
          <p style={{margin: '0 10px'}}>matcha</p>
        </LogoWrapper>
        <LoginButton to='/login'>Login</LoginButton>
    </Header>
)

export default HeaderNotConnected;