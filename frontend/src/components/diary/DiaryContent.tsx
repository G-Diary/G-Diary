import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Manuscript from './Manuscript';
import Emoji from './Emoji';
import { BsBrightnessHighFill, BsFillCloudFill, BsFillCloudSnowFill, BsFillCloudRainFill } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import Drawing from './Drawing';
import { useStore } from '../../store/store';
import api from '../../apis/axios';
import { format } from 'date-fns';
import { debounce } from '@material-ui/core';

type DiaryContentProps = {
  getLoading: (load: boolean) => void;
};

interface RefObject {
  isDoubleClick: boolean;
}

function DiaryContent(props:DiaryContentProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [windowSize, setWindowSize]=useState({
    width: window.innerWidth,
    height: window.innerHeight
  })
  const [grim, setGrim] = useState<boolean>(true); //그리기모드 버튼 클릭 여부
  const [title, setTitle] = useState<string>(''); //제목
  const [content, setContent] = useState<string>(''); //일기 내용
  const [weather, setWeather] = useState<number>(); //날씨 선택
  const { updateCanvas, setChoiceImg, setGetGrimList } = useStore();
  const [emoji, setEmoji] = useState<string>('');
  const variable = useRef<RefObject>({
    isDoubleClick: false
  });  //더블 클릭 방지 변수
  const Swal = require('sweetalert2');
  const date = location.state?.date;
  let year = date.getFullYear(); //연도 구하기
  let todayMonth = date.getMonth() + 1; //월 구하기
  let todayDate = date.getDate(); //일 구하기

  const handleResize = debounce(()=>{
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  });

  useEffect(()=>{
    window.addEventListener('resize',handleResize);
    return(()=>{
      window.removeEventListener('resize',handleResize);
    })
  })

  //이모지 받아오기
  const getEmoji = (x:string) => {
    setEmoji(x);
  };

  /**
   * 캔버스 이미지(base64)를 다시 png로 변환하기
   */

  let myImg = updateCanvas.replace('data:image/png;base64,', '');
  const byteString = atob(myImg);
  const array = [];
  for (let i = 0; i < byteString.length; i++) {
    array.push(byteString.charCodeAt(i));
  }
  const u8arr = new Uint8Array(array);
  const file = new Blob([u8arr], { type: 'image/png' });

  const user = sessionStorage.getItem('id'); //세션에 저장되어 있는 user id받아오기

  //작성한 일기 보내기
  const grimDiary = async () => {
    let form = new FormData();
    form.append('user_id', user);
    form.append('title', title);
    form.append('weather', String(weather));
    form.append('emoji', emoji);
    form.append('contents', content);
    form.append('diary_date', format(date, 'yyyy-MM-dd'));
    
    // 더블 클릭 방지 로직
    if(variable.current.isDoubleClick){
      return;
    }
    variable.current.isDoubleClick = true;
    await api
      .post('diaries/', form, {
        headers: { 'Content-Type': 'multipart/form-data', },
      })
      .then(function (response) {
        console.log(response.data)
        drawingUrl();
        
      })
      .catch(function (error) {
        if (error.response.data.title) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '제목을 입력해 주세요.',
            showConfirmButton: false,
            timer: 2000,
          });
        } else if (error.response.data.contents) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '내용을 입력해 주세요.',
            showConfirmButton: false,
            timer: 2000,
          });
        } else if (error.response.data.weather) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '날씨를 선택해 주세요.',
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  };

  const drawingUrl = async () => {
    let form = new FormData();
    form.append('user_id', user);
    form.append('diary_date', format(date, 'yyyy-MM-dd'));
    form.append('file', file);
    await api
      .post('images/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(function (response) {
        console.log(response.data)
        setChoiceImg([]);
        setGetGrimList([])
        navigate('/list');
        variable.current.isDoubleClick=false;
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  
  //AI키워드 그림 가져오기 버튼
  const bringGrim = async () => {
    props.getLoading(true);
    setGetGrimList([]);
    let form = new FormData();
    form.append('user_id', user);
    form.append('diary_date', format(date, 'yyyy-MM-dd'));
    form.append('contents', content);
    await api.post('text/', form, {
      headers: {
        'Content-Type': 'multipart/form-data',},
    })
      .then((res) => {
        api.get(`results?diary_date=${format(date, 'yyyy-MM-dd')}&&user_id=${user}`)
          .then(function (res) {
            if (res.data.result.length === 0) {
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: '키워드에 맞는 이미지가 없습니다.',
                showConfirmButton: false,
                timer: 2000
              })
              props.getLoading(false);
            } else {
              setGetGrimList(res.data);
              props.getLoading(false);
            }
          }).catch(function (error) {
            props.getLoading(false);
            if (error.response.data.ERROR === 'FAIL') {
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: '키워드에 맞는 이미지가 없습니다.',
                showConfirmButton: false,
                timer: 2000
              })
            }
          })
      }).catch((error) => {
        console.log(error)
      });
  };
  

  //제목 내용
  const onChange = (e:any) => {
    setTitle(e.target.value);
  };

  //날씨 선택
  const weatherChange = (weatherName:number) => {
    setWeather(weatherName);
  };
  //그리기 모드 버튼
  const clickedGrim = () => {
    setGrim((prev) => !prev);
  };

  interface WeatherBtnProps{
    mood: string;
    num: number;
  }

  function WeatherBtn({mood, num }:WeatherBtnProps) {
    return <WeatherRadioBtn type='radio' id={mood} checked={weather === num} onChange={() => weatherChange(num)} />;
  }

  return (
    <DiviContainer>
      <DateContainer>
        <Dateline>
          <Datetitle>날짜</Datetitle>
          <DateContent>
            {year}.{todayMonth}.{todayDate}
          </DateContent>
          <Weathercontainer>
            <WeatherBtn mood='sunny' num={1} />
            <label htmlFor='sunny'>{weather === 1 ? <BsBrightnessHighFill size={windowSize.width > 1400 && windowSize.height > 500 ? '29':
              windowSize.width > 1200 && windowSize.height > 400 ? '26':'23'
            } color='red' /> : <BsBrightnessHighFill size={windowSize.width > 1400 && windowSize.height > 500 ? '27':
              windowSize.width > 1200 && windowSize.height > 400 ? '25':'21'
            } color='#8e8d8d' />}</label>
            <WeatherBtn mood={'cloudy'} num={2} />
            <label htmlFor='cloudy'>
              {weather === 2 ? <BsFillCloudFill size={windowSize.width > 1400 && windowSize.height > 500 ? '29':
                windowSize.width > 1200 && windowSize.height > 400 ? '26':'23'
              } color='rgb(36 75 147)' /> : <BsFillCloudFill size={windowSize.width > 1400 && windowSize.height > 500 ? '28':
                windowSize.width > 1200 && windowSize.height > 400 ? '25':'21'
              } color='#8e8d8d' />}
            </label>
            <WeatherBtn mood={'rainy'} num={3} />
            <label htmlFor='rainy'>
              {weather === 3 ? (
                <BsFillCloudRainFill size={windowSize.width > 1400 && windowSize.height > 500 ? '28':
                  windowSize.width > 1200 && windowSize.height > 400 ? '26':'22'
                } style={{ paddingTop: '1.5px' }} color='rgb(76 76 76)' />
              ) : (
                <BsFillCloudRainFill size={windowSize.width > 1400 && windowSize.height > 500 ? '26.5':
                  windowSize.width > 1200 && windowSize.height > 400 ? '24':'20'
                } style={{ paddingTop: '1.5px' }} color='#8e8d8d' />
              )}
            </label>
            <WeatherBtn mood={'snow'} num={4} />
            <label htmlFor='snow'>
              {weather === 4 ? (
                <BsFillCloudSnowFill size={windowSize.width > 1400 && windowSize.height > 500 ? '28':
                  windowSize.width > 1200 && windowSize.height > 400 ? '26':'22'
                } style={{ paddingTop: '2px' }} color='#FFFAFA' />
              ) : (
                <BsFillCloudSnowFill size={windowSize.width > 1400 && windowSize.height > 500 ? '26':
                  windowSize.width > 1200 && windowSize.height > 400 ? '24':'21'
                } style={{ paddingTop: '2px' }} color='#8e8d8d' />
              )}
            </label>
          </Weathercontainer>
        </Dateline>
      </DateContainer>
      <TitleContainer>
        <Title>제목: </Title>
        <Titlecontent>
          <input type='text' onChange={onChange} value={title} />
        </Titlecontent>
        {
          (windowSize.width > 1400 && windowSize.height > 500) ? (
            <Emoji getEmoji={getEmoji} marginL="150px" marginT="415px" icon="30px" />
          ):
            (windowSize.width > 1200 && windowSize.height > 400) ?(
              <Emoji getEmoji={getEmoji} marginL="130px" marginT="415px" icon="25px" />
            ) :(
              <Emoji getEmoji={getEmoji} marginL="35px" marginT="415px" icon="20px" />
            )
        }
       
      </TitleContainer>
      <Canvas>
        {
          (windowSize.width > 1400 && windowSize.height > 500) ? (
            <Drawing grim={grim} x={500} y={290} xPercent={68} yPercent={-100} icon={26} stroke={5}/>
          ):
            (windowSize.width > 1200 && windowSize.height > 400) ?(
              <Drawing grim={grim} x={480} y={270} xPercent={67} yPercent={-120} icon={24} stroke={4} />
            ) :(
              <Drawing grim={grim} x={380} y={220} xPercent={63} yPercent={-100} icon={22} stroke={3} />
            )
        }
      </Canvas>
      <ButtonContainer>
        <Modebutton style={{ width: '20%' }} onClick={bringGrim}>
          그림가져오기
        </Modebutton>
        <Modebutton style={{ width: '15%' }} onClick={clickedGrim}>
          {grim ? '그림그리기' : '스탑'}
        </Modebutton>
        <Savebutton
          onClick={grimDiary}>
          저장하기
        </Savebutton>
      </ButtonContainer>
      <Content>
        <Manuscript setContent={setContent} />
      </Content>
    </DiviContainer>
  );
}

export default DiaryContent;

/*두쪽 페이지 틀에서 한쪽 영역 컨테이너*/
export const DiviContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 90;
`;
  //  @media screen and (max-width: 1200px) and (max-height: 400px)
/*날짜&날씨 container*/
export const DateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 60px;
  @media screen and (max-width: 1400px), screen and (max-height: 500px){
    width: 480px;
    height: 40px;
    margin-top: 15px; 
  }
  @media screen and (max-width: 1200px), screen and (max-height: 400px){
    width: 380px;
    height: 30px; 
    margin-top: 15px;
  }
`;

export const Dateline = styled.div`
  width: 500px;
  height: 40px;
  background-color: #bcbcbc;
  display: flex;
  align-items: center;
  border-radius: 3px;
  @media screen and (max-width: 1400px), screen and (max-height: 500px){
    width: 480px;
    height: 40px; 
    margin-bottom: 15px;
  }
  @media screen and (max-width: 1200px), screen and (max-height: 400px){
    width: 380px;
    height: 30px; 
  }
`;

export const Datetitle = styled.div`
  margin-left: 5%;
  width: 10%;
  font-size: 25px;
  text-align: center;
  font-family: KyoboHand;
  @media screen and (max-width: 1400px), screen and (max-height: 500px){
    font-size: 23px; 
  }
  @media screen and (max-width: 1200px), screen and (max-height: 400px){
    font-size: 20px; 
    margin-top:0;
  }
`;

export const DateContent = styled.div`
  width: 25%;
  font-size: 24px;
  border: 2px solid transparent;
  border-radius: 30px;
  background: #d9d9d9;
  margin-left: 2%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 100%;
  color: #4b4b4b;
  font-family: KyoboHand;
  padding-top: 3px;
  @media screen and (max-width: 1400px), screen and (max-height: 500px){
    font-size: 20px;
    line-height: 80%;
  }
  @media screen and (max-width: 1200px), screen and (max-height: 400px){
    font-size: 18px;
    line-height: 80%;
  }
`;

export const Weathercontainer = styled.div`
  width: 32%;
  text-align: right;
  margin-left: auto;
  padding-right: 8px;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  margin-top: 6px;
  @media screen and (max-width: 1400px), screen and (max-height: 500px){
    width: 30%;
  }
  @media screen and (max-width: 1200px), screen and (max-height: 400px){
    width: 33%;
    margin-bottom: 1px;
  }
`;

export const WeatherRadioBtn = styled.input`
  display: none;
`;

/*제목 container*/
export const TitleContainer = styled.div`
  width: 500px;
  height: 40px;
  background: #c7c7c7;
  display: flex;
  align-items: center;
  border-top-left-radius: 3px;
  border-top=right-radius: 3px;
  font-family: KyoboHand;
  @media screen and (max-width: 1400px), screen and (max-height: 500px){
    width: 480px;
    height: 35px; 
  }
  @media screen and (max-width: 1200px), screen and (max-height: 400px){
    width: 380px;
    height: 30px; 
  } 
`;

export const Title = styled.div`
  margin-left: 20px;
  width: 60px;
  text-align: left;
  font-size: 25px;
  font-family: KyoboHand;
  z-index: 120;
  position: absolute;
  @media screen and (max-width: 1400px), screen and (max-height: 500px){
    width: 40px;
    font-size: 22px;
  }
  @media screen and (max-width: 1200px), screen and (max-height: 400px){
    width: 40px;
    font-size: 20px;
  } 
`;

export const Titlecontent = styled.div`
  width: 300px;
  margin-left: 70px;
  z-index: 130;
  position: absolute;
  > input {
    width: 300px;
    margin-bottom: 0.5%;
    font-size: 26px;
    border: 0;
    outline: none;
    background: transparent;
    padding-top: 4px;
    font-family: KyoboHand;
    color: #4b4b4b;
    caret-color: transparent;
  }
  @media screen and (max-width: 1400px), screen and (max-height: 500px){
    width: 300px;
    margin-left: 65px;
    height: 30px;
    > input {
      font-size: 22px;
      width: 300px;
      height: 25px;
    }
  }
  @media screen and (max-width: 1200px), screen and (max-height: 400px){
    width: 250px;
    margin-left: 65px;
    height: 25px;
    > input {
      font-size: 20px;
      width: 250px;
      height: 20px;
    }
  } 
`;

/*그림판 container*/
export const Canvas = styled.div`
  width: 500px;
  height: 290px;
  background: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  @media screen and (max-width: 1400px), screen and (max-height: 500px){
    width: 480px;
    height: 270px; 
  }
  @media screen and (max-width: 1200px), screen and (max-height: 400px){
    width: 380px;
    height: 220px; 
  }
`;

/*버튼 컨테이너(그림 편집)*/
export const ButtonContainer = styled.div`
  width: 500px;
  height: 25px;
  display: flex;
  align-items: center;
  margin-top: 10px;
  @media screen and (max-width: 1400px), screen and (max-height: 500px){
    width: 480px;
    height: 25px; 
  }
  @media screen and (max-width: 1200px), screen and (max-height: 400px){
    width: 380px;
    height: 20px; 
    margin-top: 10px;
  }
`;
export const Modebutton = styled.button`
  width: 75px;
  height: 30px;
  border-radius: 20px;
  font-size: 15px;
  text-align: center;
  background-color: transparent;
  margin-right: 1.5%;
  border: 2px solid black;
  transition: box-shadow 250ms ease-in-out, color 200ms ease-in-out;
  font-family: KyoboHand;
  &:hover {
    box-shadow: 0 0 40px 40px #404040 inset;
    color: white;
    border: none;
  }
  @media screen and (max-width: 1400px), screen and (max-height: 500px){
    font-size: 13px;
    height: 27px;
  }
  @media screen and (max-width: 1200px), screen and (max-height: 400px){
    height: 23px;
    font-size: 11px;
  }
`;

export const Savebutton = styled.button`
  width: 110px;
  height: 30px;
  background-color: black;
  color: white;
  border-radius: 15px;
  text-align: center;
  border: none;
  margin-left: auto;
  font-size: 15px;
  padding-bottom: 0.5%;
  overflow: hidden;
  transition: box-shadow, color 300ms ease-in-out;
  font-family: KyoboHand;
  padding-top: 3px;
  &:hover {
    color: rgb(54, 54, 54);
    background-color: transparent;
    border: 3px solid rgb(54, 54, 54);
  }
  @media screen and (max-width: 1400px), screen and (max-height: 500px){
    width: 100px;
    height: 27px;
    font-size: 13px;
  }
  @media screen and (max-width: 1200px), screen and (max-height: 400px){
    width: 70px;
    height: 23px;
    font-size: 11px;
  }
`;
/*내용 container*/
export const Content = styled.div`
  width: 520px;
  height: 280px;
  @media screen and (max-width: 1400px), screen and (max-height: 500px){
    width: 480px;
    height: 260px; 
  }
  @media screen and (max-width: 1200px), screen and (max-height: 400px){
    width: 380px;
    height: 210px;
  }
`;
