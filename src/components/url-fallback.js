import React from "react";
import Spinner from "./spinner";
import styled from "styled-components";

const Div = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const URLFallBack = () => {
    return (
        <Div>
            <Spinner />
        </Div>
    );
};

export default URLFallBack;
