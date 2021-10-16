import styled from 'styled-components';

const MarkerItem = styled.div`
  background-color: white;
  height: 24px;
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-left: -12px;
  margin-top: -12px;
`;
const InnerMarker = styled.div`
  background-color: black;
  height: 16px;
  width: 16px;
  border-radius: 50%;
`;

export default function CapMarker(){
  return <MarkerItem>
    <InnerMarker>

    </InnerMarker>
  </MarkerItem>
}