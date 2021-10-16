import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';
import 'swiper/swiper.min.css';
import './../App.css';

SwiperCore.use([Pagination]);

const CarouselItem = styled.div`
  position: absolute;
  bottom: 32px;
  left: 24px;
  width: calc(100vw - 48px);
  height: 196px;
  overflow: visible;
`;
const Slide = styled.div`
  width: 132px;
  height: 196px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 2px 6px 10px rgba(0, 0, 0, 0.1);
`;
const Header = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TitleWrapper = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 16px;
`;
const Separator = styled.div`
  width: 100%;
  height: 3px;
  background-color: rgba(245, 141, 18, 0.5);
`;
const MainContent = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const ListElem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
const IconWrapper = styled.div`
  background-color: rgba(8, 47, 59, 0.05);
  height: 28px;
  width: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;
const Icon = styled.img`
  
`;
const Text = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 13px;
`;


export default function Carousel({shortedArray}){
  console.log(shortedArray[0].properties.location_id);
  return <CarouselItem>
    <Swiper
      spaceBetween={16}
      slidesPerView={'auto'}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {shortedArray.map((district, index)=>(
        <SwiperSlide key={index} className='my-swiper-slide'>
          <Slide>
            <Header>
              <TitleWrapper>
                {"District " + district.properties.location_id}
              </TitleWrapper>
            </Header>
            <Separator />
            <MainContent>
              <ListElem>
                <IconWrapper>
                  <Icon src="./cash.svg" alt="Cash Icon"/>
                </IconWrapper>
                <Text>
                  {78}
                </Text>
              </ListElem>
              <ListElem>
                <IconWrapper>
                  <Icon src="./demand.svg" alt="Demand Icon"/>
                </IconWrapper>
                <Text>
                  {236}
                </Text>
              </ListElem>
              <ListElem>
                <IconWrapper>
                  <Icon src="./distance.svg" alt="Distance Icon"/>
                </IconWrapper>
                <Text>
                  {"7.5 miles"}
                </Text>
              </ListElem>
            </MainContent>
          </Slide>
        </SwiperSlide>
      ))}
    </Swiper>
  </CarouselItem>
}