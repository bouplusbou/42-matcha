import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
const LoginButton = styled.p`
  display: flex;
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
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
`;
const Wrapper = styled.section`
  display: flex;
  background-color: #6F48BD;
  height: 100vh;
`;
const TextWrapper = styled.section`
  margin: 10vw;
  background-color: #6F48BD;
  height: 100vh;
`;
const PhotoWrapper = styled.section`
  background-color: #6F48BD;
  height: 100vh;
`;
const Text = styled.p`
  color: white;
  font-family: 'Open Sans', sans-serif;
`;
const Title = styled.h1`
  color: white;
  font-size: 4vw;
  font-family: 'Arbutus Slab', serif;
`;
const CTA = styled.p`
  margin: 50px auto;
  background-color: #FF0041;
  padding: 20px;
  width: 130px;
  height: 20px;
  text-align: center;
  border-radius: 100px;
  color: white;
  box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.23);
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
`;

const PageHome =  () => (
  <div>
    <Header>
      <LogoWrapper>
        <img src={'./logo_color.svg'} width="50px" height="50px" alt=""/>
        <p style={{margin: '0 10px'}}>matcha</p>
      </LogoWrapper>
      <LoginButton>
        <Link style={{textDecoration: 'none', color: 'rgba(255, 255, 255, 0.56)'}} to='/login'>Login</Link>
      </LoginButton>
    </Header>
    <Wrapper>
      <TextWrapper>
        <Title>
          <h1>Go get <br/>some love.</h1>
        </Title>
        <Text>
          <p>Matcha lets you find the perfect match for your life.<br/> 
          Unlike any other dating app we don’t use any fancy technology.<br/>
          Just some Node.js with Express and React.<br/>
          This is a school project made by students at @42born2code<br/>
          And yes we stole the Facebook Dating logo.</p>
        </Text>
        <CTA>
          <Link style={{textDecoration: 'none', color: 'white'}} to='/signup'>Start Dating</Link>
        </CTA>
      </TextWrapper>
      <PhotoWrapper>
        <img src={'./photo-1530013255753-3f6578d19059.jpg'} style={{clipPath: 'polygon(626px 463px,765px 236px,687px 31px,271px 100px,70px 10px,49px 250px,133px 406px,374px 462px,529px 393px)'}} alt="Photo of a couple"/>
      </PhotoWrapper>
    </Wrapper>
  </div>
);

export default PageHome;