import styled from 'styled-components';
import { Link } from "react-router-dom";

const SettingItem = styled(Link)`
    width: 100vw;
    height: 100vh;
`;
const Content = styled.div`
    width: 100%;
    height: 100vh;
    background-color: rgba(8, 47, 59, 0.05);
`;

export default function Setting(){
    return <SettingItem to="/map">
        <Content />
    </SettingItem>
}