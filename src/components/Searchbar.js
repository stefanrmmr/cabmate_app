import styled from 'styled-components';

const SearchbarItem = styled.div`
  position: absolute;
  top: 32px;
  left: 24px;
  width: calc(100vw - 48px);
  display: flex;
  justify-content: space-between;
`;
const Input = styled.input`
  height: 44px;
  width: calc(100vw - 48px - 60px);
  font-size: 13px;
  background: white;
  border: none;
  border-radius: 10px;
  padding-left: calc(38px);
  box-sizing: border-box;
  box-shadow: 2px 6px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Montserrat', sans-serif;
  ::placeholder {
    color: rgba(8, 47, 59, 0.5);
    border-radius: 10px;
  }
  :focus { 
    outline: none !important;
    border: 1px solid black;
    border-radius: 10px;
 }
`;
const Button = styled.div`
  width: 44px;
  height: 44px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 2px 6px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ImageWrapper = styled.div`
  position: absolute;
  height: 44px;
  width: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Image = styled.img`

`;


export default function Searchbar(){
  return <SearchbarItem>
    <ImageWrapper>
      <Image src="./search.svg" alt="Search Icon"></Image>
    </ImageWrapper>
    <Input type="text" placeholder="Search...">
    </Input>
    <Button>
      <Image src="./menu.svg" alt="Menu Icon"></Image>
    </Button>
  </SearchbarItem>
}