import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Hero = styled.section`
  background-color: #6F48BD;
  height: 100vh;
`;
const Section = styled.section`
  display: flex;
  justify-content: center;
  padding-top: 10%;
`;
const Container = styled.section`
  flex-basis: 400px;
  padding: 50px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.1);
  h1 {
    font-size: 2rem;
    text-align: center;
    font-family: Roboto;
    color: #292929;
  }
`;
const Redirect = styled.section`
  color: black;
  font-weight: 500;
  text-align: center;
  a {
    text-decoration: none;
    color: black;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    text-decoration: underline;
}
`;
const ErrorBox = styled.section`
  background-color: #FFECEC;
  color: red;
  padding: 5px;
  width: 60%;
  border: solid 0.5px red;
  border-radius: 8px;
  margin: 0 auto;
  margin-top: 40px;
  text-align: center;
  p {
    font-size: 0.8rem;
  }
`;


export default function PageConfirmAccount(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                await axios.post('/users/confirmation', {hash: props.match.params.hash});
                setIsError(false);
            } catch(error) {}
            setIsLoading(false);
        }
        fetchData();
    }, [props.match.params.hash]);

    return (
        <Hero>
            <Section>
                <Container>
                    <h1>Welcome to Matcha ! <span aria-label="Congratulations" role="img" >🎉</span></h1>
                {!isLoading && isError && 
                    <ErrorBox>
                        <p> <span aria-label="Attention" role="img" >⚠️</span> the link you provided is not working, please try again.</p>
                    </ErrorBox>
                }
                {!isLoading && !isError &&
                    <Redirect>
                        <p>Your account is now confirmed.</p>
                        <p>Wanna <Link to="/login">login</Link> ?</p>
                    </Redirect>
                }
                </Container>
            </Section>
        </Hero>
    );
}