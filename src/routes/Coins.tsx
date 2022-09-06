import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    padding: 0px 20px;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;

`;

const Main = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1 `
    color: ${props => props.theme.accentColor};
    font-size: 48px;
`;

const ConinsList = styled.ul`
    width: 800px;
`;

const Coin = styled.li`
    background-color: white;
    color: ${props => props.theme.bgColor};
    border-radius: 15px;
    margin-bottom: 10px;
    a {
        display: flex;
        align-items: center;
        transition: color 0.2s ease-in-out;
        padding: 20px;
    }
    &:hover {
        a {
            color: ${props => props.theme.accentColor}
        }
    }
`;


const Loader = styled.span`
    text-align: center;
    display: block;
`;

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;

interface CoinInterface {
    "id": string,
    "name": string,
    "symbol": string,
    "rank": number,
    "is_new": boolean,
    "is_active": boolean,
    "type": string,   
}

function Coins() {
    const [ coins, setCoins ] = useState<CoinInterface[]>([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        (async () => {
            const response = await fetch("https://api.coinpaprika.com/v1/coins");
            const json = await response.json();
            setCoins(json.slice(0, 100));
            setLoading(false);
            console.log("useEffect loading state : ", loading);
        })();
    });

    return (
        <Container>
            <Header>
                <Title>코인</Title>
            </Header>
            <Main>
                {
                    loading ? (
                        <Loader>"Loading ..."</Loader>
                    ): (

                        <ConinsList>                
                            {coins.map(coin => (
                                <Coin key={coin.id}>
                                    <Link to={{
                                            pathname: `/${coin.id}`,
                                            state: { name: coin.name }
                                        }}>
                                        <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                                        {coin.name} &rarr;
                                    </Link>
                                </Coin>
                            ))}
                        </ConinsList>
                    )
                }
            </Main>
        </Container>
    );
}

export default Coins;