import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Body = styled.section`
  display: flex;
  flex-direction: column;
`;
const Header = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 40px;
  height: 30px;
  background-color: #6F48BD;
`;
const LogoWrapper = styled.p`
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
const Wrapper = styled.section`
  padding: 0 10vw;
  display: flex;
  background-color: #6F48BD;
  height: 100vh;
  color: white;
  h1 {
    font-family: 'Arbutus Slab', serif;
    margin: 0;
    margin-bottom: 30px;
  };
  p {
    font-family: 'Open Sans', sans-serif;
    margin-bottom: 100px;
  };
  @media screen and (min-width: 320px) {
    h1 {
      font-size: calc(70px + 6 * ((100vw - 320px) / 680));
    }
  }
  @media screen and (min-width: 1000px) {
    h1 {
      font-size: 100px;
    }
  }
  flex: 1 0 auto;
`;
const TextWrapper = styled.section`
  margin: 0;
  padding: 10vw;
  padding-right: 0;
  background-color: #6F48BD;
  flex: 1 1;
`;
const PhotoWrapper = styled.section`
  background-color: #6F48BD;
  flex: 1 2;
  @media (max-width: 1500px) {
    display: none;
  }
  img {
    width: 100%;
    margin: 0 auto;
  }
`;
const CTA = styled(Link)`
  text-decoration: none;
  display: block;
  margin: 0;
  margin-left: 8vw;
  background-color: #FF0041;
  padding: 20px 0;
  width: 250px;
  height: 20px;
  text-align: center;
  border-radius: 100px;
  color: white;
  box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.23);
  font-family: 'Roboto', sans-serif;
  transition: box-shadow 0.5s ease-in-out;
  &:hover {
    transition: box-shadow 0.5s ease-in-out;
    box-shadow: none;
  }
`;
const Footer = styled.section`
  flex-shrink: 0;
  background-color: white;
`;

const PageHome =  () => (
  <Body>
    <Header>
      <LogoWrapper>
        <img src={'./logo_color.svg'} width="50px" height="50px" alt=""/>
        <p style={{margin: '0 10px'}}>matcha</p>
      </LogoWrapper>
      <LoginButton to='/login'>Login</LoginButton>
    </Header>
    <Wrapper>
      <TextWrapper>
        <h1>Go get <br/>some love.</h1>
        <p>Matcha lets you find the perfect match for your life.<br/> 
        Unlike any other dating app we don’t use any fancy technology.<br/>
        Just some Node.js with Express and React.<br/>
        This is a school project made by students at @42born2code<br/>
        And yes we stole the Facebook Dating logo.</p>
        <CTA to='/signup'>Start Dating</CTA>
      </TextWrapper>
      <PhotoWrapper>
        <img src={'./home_photo.png'} alt="Photo of a couple"/>
      </PhotoWrapper>
    </Wrapper>
    <Footer>
      <p>My sticky footer can be found here.</p>
    </Footer>
  </Body>
);

export default PageHome;