import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Menu = styled.section`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0 20vw;
  padding: 20px;
  height: 20px;
  background-color: #FFFFFF;
  color: #6F48BD;
`;
const Logo = styled.section`
  margin-right: auto;
`;
const Links = styled.section`
  flex-basis: 30vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
`;

class Header extends Component {

  render() {
    return (
      <Menu>
        <Logo>
          <img src={'./logo_black.svg'} width="25px" height="25px" alt=""/>
        </Logo>
        <Links>
          <Link style={{
            textDecoration: 'none',
            color: '#6F48BD',
            fontFamily: 'Roboto',
            fontWeight: 500,
            fontSize: '15px',
            }} 
            to='/search'>Search</Link>
          <Link style={{
            textDecoration: 'none',
            color: '#6F48BD',
            fontFamily: 'Roboto',
            fontWeight: 500,
            fontSize: '15px',
            }} 
            to='/search'>Matcher</Link>
          <Link style={{
            textDecoration: 'none',
            color: '#6F48BD',
            fontFamily: 'Roboto',
            fontWeight: 500,
            fontStyle: 'bold',
            fontSize: '15px',
            }} 
            to='/profile'>Profile</Link>
          <Link style={{
            textDecoration: 'none',
            color: '#6F48BD',
            fontFamily: 'Roboto',
            fontWeight: 500,
            fontSize: '15px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '8px',
            border: 'solid 0.5px #6F48BD',
            borderRadius: '10px',
            }} 
            to='/logout'>Logout</Link>
        </Links>
      </Menu>
    )
  }
}

export default Header;
