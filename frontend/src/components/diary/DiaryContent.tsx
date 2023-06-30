import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Manuscript from './Manuscript';
import Emoji from './Emoji';
import { BsBrightnessHighFill, BsFillCloudFill, BsFillCloudSnowFill, BsFillCloudRainFill } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import Drawing from './Drawing';
import { useStore } from '../../store/store';
import api from '../../apis/axios';
import { format } from 'date-fns';

type DiaryContentProps = {
  getLoading: (load: boolean) => void;
};

interface RefObject {
  isDoubleClick: boolean;
}

function DiaryContent(props:DiaryContentProps) {
  const navigate = useNavigate();
  const location = useLocation();
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
    console.log(format(date, 'yyyy-MM-dd'));
    
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
          <Weathercontainer style={{ marginTop: '5px' }}>
            <WeatherBtn mood='sunny' num={1} />
            <label htmlFor='sunny'>{weather === 1 ? <BsBrightnessHighFill size='29' color='red' /> : <BsBrightnessHighFill size='27' color='#8e8d8d' />}</label>
            <WeatherBtn mood={'cloudy'} num={2} />
            <label htmlFor='cloudy'>
              {weather === 2 ? <BsFillCloudFill size='29' color='rgb(36 75 147)' /> : <BsFillCloudFill size='28' color='#8e8d8d' />}
            </label>
            <WeatherBtn mood={'rainy'} num={3} />
            <label htmlFor='rainy'>
              {weather === 3 ? (
                <BsFillCloudRainFill size='28' style={{ paddingTop: '1.5px' }} color='rgb(76 76 76)' />
              ) : (
                <BsFillCloudRainFill size='26.5' style={{ paddingTop: '1.5px' }} color='#8e8d8d' />
              )}
            </label>
            <WeatherBtn mood={'snow'} num={4} />
            <label htmlFor='snow'>
              {weather === 4 ? (
                <BsFillCloudSnowFill size='28' style={{ paddingTop: '2px' }} color='#FFFAFA' />
              ) : (
                <BsFillCloudSnowFill size='26' style={{ paddingTop: '2px' }} color='#8e8d8d' />
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
        <Emoji getEmoji={getEmoji} />
      </TitleContainer>
      <Canvas>
        <Drawing grim={grim} />
      </Canvas>
      <ButtonContainer>
        <Modebutton style={{ width: '100px' }} onClick={bringGrim}>
          그림가져오기
        </Modebutton>
        <Modebutton style={{ width: '80px' }} onClick={clickedGrim}>
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
  position: absolute;
  width: 600px;
  height: 750px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 90;
`;
/*날짜&날씨 container*/
export const DateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 60px;
`;

export const Dateline = styled.div`
  width: 500px;
  height: 40px;
  background-color: #bcbcbc;
  display: flex;
  align-items: center;
  border-radius: 3px;
`;

export const Datetitle = styled.div`
  margin-left: 5%;
  width: 10%;
  font-size: 25px;
  text-align: center;
  font-family: KyoboHand;
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
`;

export const Weathercontainer = styled.div`
  width: 32%;
  text-align: right;
  margin-left: auto;
  padding-right: 8px;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
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
`;

export const Title = styled.div`
  margin-left: 5%;
  width: 10%;
  text-align: left;
  font-size: 25px;
  font-family: KyoboHand;
  z-index: 120;
  position: absolute;
`;

export const Titlecontent = styled.div`
  width: 60%;
  margin-left: 13%;
  z-index: 120;
  position: absolute;
  > input {
    width: 90%;
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
`;

/*그림판 container*/
export const Canvas = styled.div`
  width: 500px;
  height: 290px;
  background: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

/*버튼 컨테이너(그림 편집)*/
export const ButtonContainer = styled.div`
  width: 500px;
  height: 25px;
  display: flex;
  align-items: center;
  margin-top: 2%;
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
  padding-bottom: 0.5%;
  padding-top: 3px;
  &:hover {
    box-shadow: 0 0 40px 40px #404040 inset;
    color: white;
    border: none;
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
`;
/*내용 container*/
export const Content = styled.div`
  width: 520px;
  height: 280px;
`;
