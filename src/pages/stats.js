import styled from 'styled-components';
import { Link } from "react-router-dom";

const StatsItem = styled(Link)`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
`;
const Image = styled.img`
    width: 100%;
    height: auto;
    object-fit: contain;
`;

export default function Stats(){
    return <StatsItem to="/map">
        <Image src="./Statistics.jpg" alt="Statistics Screen"/>
    </StatsItem>
}