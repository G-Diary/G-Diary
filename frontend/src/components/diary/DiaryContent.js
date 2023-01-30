import React, {useState} from 'react';
import styled from 'styled-components';
import Manuscript from './Manuscript';
import Emoji from './Emoji';
import { BsBrightnessHighFill, BsFillCloudFill ,BsFillCloudSnowFill, BsFillCloudRainFill } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import Drawing from './Drawing';
import { useStore } from '../../store/store';
import api from '../../apis/axios';
import { format } from 'date-fns';

function DiaryContent({getLoading}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [grim, setGrim] = useState(true);  //그리기모드 버튼 클릭 여부
  const [title, setTitle]=useState(''); //제목
  const [content, setContent]=useState(''); //일기 내용
  const [weather, setWeather]=useState(); //날씨 선택
  const {updateCanvas}=useStore();
  const Swal = require('sweetalert2');
  const date=location.state?.date;
  let year=date.getFullYear();  //연도 구하기
  let todayMonth=date.getMonth()+1;  //월 구하기
  let todayDate=date.getDate();  //일 구하기

  // let file=new Blob([new Uint8Array(updateCanvas)], {type: 'image/png'});
  // const url=window.URL.createObjectURL(file);
  let myImg = updateCanvas.replace('data:image/png;base64,', '');
  // console.log(file);  
  // console.log(url);
  console.log(myImg);
  console.log(updateCanvas)

  const user=sessionStorage.getItem('id');
  console.log(sessionStorage);
  const diaryData={
    'user_id':user,
    'title': title,
    'weather': weather,
    'contents':content,
    'diary_date': format(date, 'yyyy-MM-dd')
  }
  console.log(diaryData);
 
  //작성한 일기 보내기
  const grimDiary = async () => {
    let form = new FormData();
    form.append('user_id',user);
    form.append('title',title);
    form.append('weather',weather);
    form.append('drawing_url','images/22.png');
    form.append('contents',content);
    form.append('diary_date',format(date, 'yyyy-MM-dd'));

    await api.post('diaries/', form)
      .then(function (response){
        console.log(response, JSON.stringify(response,null,7));
        navigate('/list')
      })
      .catch(function (error) {
        if (error.response.data.title) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '제목을 입력해 주세요.',
            showConfirmButton: false,
            timer: 2000
          })
        } else if (error.response.data.contents) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '내용을 입력해 주세요.',
            showConfirmButton: false,
            timer: 2000
          })
        } else if (error.response.data.weather) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '날씨를 선택해 주세요.',
            showConfirmButton: false,
            timer: 2000
          })
        }
      })
  }
  console.log(updateCanvas);
  //제목 내용
  const onChange = (e) => {
    setTitle(e.target.value);
  }
  
  //날씨 선택
  const weatherChange = (weatherName) => {
    setWeather(weatherName);
  }
  //그리기 모드 버튼
  const clickedGrim = () => {
    setGrim((prev) => !prev);
  };

  //AI키워드 그림 가져오기 버튼
  const bringGrim = () => {
    getLoading(true);
  }
    
  return (
    <DiviContainer>
      <DateContainer>
        <Dateline>
          <Datetitle>날짜</Datetitle>
          <DateContent>{year}.{todayMonth}.{todayDate}</DateContent>
          <Weathercontainer style={{ marginTop: '5px' }}>
            <WeatherRadioBtn
              type='radio'
              id="sunny"
              checked={weather === 'sunny'}
              onChange={() => weatherChange(1)}
            />
            <label htmlFor="sunny">
              {weather === 1 ? (<BsBrightnessHighFill size="29" color='red' />) : (<BsBrightnessHighFill size="27" color='#8e8d8d' />)}
            </label>
            <WeatherRadioBtn
              type='radio'
              id="cloudy"
              checked={weather === 'cloudy'}
              onChange={() => weatherChange(2)}
            />
            <label htmlFor="cloudy">
              {weather === 2 ? (<BsFillCloudFill size="29" color='rgb(36 75 147)' />) : (<BsFillCloudFill size="28" color='#8e8d8d' />)}
            </label>
            <WeatherRadioBtn
              type='radio'
              id="rainy"
              checked={weather === 'rainy'}
              onChange={() => weatherChange(3)}
            />
            <label htmlFor="rainy">
              {weather === 3 ? (<BsFillCloudRainFill size="28" style={{ paddingTop: '1.5px' }} color='rgb(76 76 76)' />) : (<BsFillCloudRainFill size="26.5" style={{ paddingTop: '1.5px' }} color='#8e8d8d' />)}
            </label>
            <WeatherRadioBtn
              type='radio'
              id="snow"
              checked={weather === 'snow'}
              onChange={() => weatherChange(4)}
            />
            <label htmlFor="snow">
              {weather === 4 ? (<BsFillCloudSnowFill size="28" style={{ paddingTop: '2px' }} color='#FFFAFA' />) : (<BsFillCloudSnowFill size="26" style={{ paddingTop: '2px' }} color='#8e8d8d' />)}
            </label>
          </Weathercontainer>
        </Dateline>
      </DateContainer>
      <TitleContainer>
        <Title>제목: </Title>
        <Titlecontent><input type="text" onChange={onChange} value={title} /></Titlecontent>
        <Emoji />
      </TitleContainer>
      <Canvas>
        <Drawing grim={grim} />
      </Canvas>
      <ButtonContainer>
        <Modebutton style={{'@media screen and (min-width: 1401px), screen and (min-height: 701px)' :{
          width: '100px',
        },
        '@media screen and (max-width: 1400px), screen and (max-height: 700px)' :{
          width: '80px'
        }  }} onClick={bringGrim}>그림가져오기</Modebutton>
        <Modebutton style={{'@media screen and (min-width: 1401px), screen and (min-height: 701px)' :{
          width: '80px' 
        },
        '@media screen and (max-width: 1400px), screen and (max-height: 700px)' :{
          width: '64px' 
        } }} onClick={clickedGrim}>{grim ? '그림그리기' : '스탑'}</Modebutton>
        <Savebutton onClick={grimDiary}>저장하기</Savebutton>
      </ButtonContainer>
      <Content><Manuscript setContent={setContent} /></Content>
    </DiviContainer>
    
  );
}

export default DiaryContent;

/*두쪽 페이지 틀에서 한쪽 영역 컨테이너*/
export const DiviContainer = styled.div`
    position: absolute;  
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 90;
    @media screen and (min-width: 1401px), screen and (min-height: 701px) {
      width: 600px;
      height: 750px;
    }
    @media screen and (max-width: 1400px), screen and (max-height: 700px) {
      width: 480px;
      height: 600px;
    }
`
/*날짜&날씨 container*/
export const DateContainer=styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    @media screen and (min-width: 1401px), screen and (min-height: 701px) {
      width: 500px;
      height: 60px;
    }
    @media screen and (max-width: 1400px), screen and (max-height: 700px) {
      width: 400px;
      height: 48px;
    }
`

export const Dateline=styled.div`
    background-color:#BCBCBC;
    display: flex;
    align-items: center;
    border-radius: 3px;
    @media screen and (min-width: 1401px), screen and (min-height: 701px) {
      width: 500px;
      height: 40px;
    }
    @media screen and (max-width: 1400px), screen and (max-height: 700px) {
      width: 400px;
      height: 32px;
    }
`

export const Datetitle=styled.div`
    margin-left: 5%;
    width: 10%;
    text-align: center;
    font-family:KyoboHand;
    @media screen and (min-width: 1401px), screen and (min-height: 701px) {
      font-size: 25px;
    }
    @media screen and (max-width: 1400px), screen and (max-height: 700px) {
      font-size: 20px;
    }
`

export const DateContent = styled.div`
    width: 25%;

    border: 2px solid transparent;
    background: #D9D9D9;
    margin-left: 2%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 100%;
    color: #4b4b4b;
    font-family:KyoboHand;
    @media screen and (min-width: 1401px), screen and (min-height: 701px) {
      font-size: 24px;
      border-radius: 30px;
      padding-top: 3px;
    }
    @media screen and (max-width: 1400px), screen and (max-height: 700px) {
      font-size: 19.2px;
      border-radius: 24px;
      padding-top: 2.4px;
    }
`

export const Weathercontainer = styled.div`
    width: 32%;
    text-align: right;
    margin-left: auto;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    @media screen and (min-width: 1401px), screen and (min-height: 701px) {
      padding-right: 8px;
    }
    @media screen and (max-width: 1400px), screen and (max-height: 700px) {
      padding-right: 6.4px;
    }
`

export const WeatherRadioBtn = styled.input`
  display:none;
`

/*제목 container*/
export const TitleContainer = styled.div`
  background: #C7C7C7;
  display: flex;
  align-items: center;
  border-top-left-radius: 3px;
  border-top=right-radius: 3px;
  font-family:KyoboHand;
  @media screen and (min-width: 1401px), screen and (min-height: 701px) {
    width: 500px;
    height: 40px;
  }
  @media screen and (max-width: 1400px), screen and (max-height: 700px) {
    width: 400px;
    height: 32px;
  }
`

export const Title =styled.div`
  margin-left: 5%;
  width: 10%;
  text-align: left;
  font-family:KyoboHand;
  @media screen and (min-width: 1401px), screen and (min-height: 701px) {
    font-size: 25px;
  }
  @media screen and (max-width: 1400px), screen and (max-height: 700px) {
    font-size: 20px;
  }
`

export const Titlecontent = styled.div`
  width: 75%;
  margin-left: 2%;
    @media screen and (min-width: 1401px), screen and (min-height: 701px) {
      >input{
        width: 100%;
        margin-bottom:0.5%;
        font-size: 26px;
        border: 0;
        outline: none;
        background: transparent;
        padding-top:4px;
        font-family:KyoboHand;
        color:#4b4b4b;
        caret-color: transparent;
    }
    @media screen and (max-width: 1400px), screen and (max-height: 700px) {
      >input{
        width: 100%;
        margin-bottom:0.5%;
        font-size: 20.8px;
        border: 0;
        outline: none;
        background: transparent;
        padding-top:4px;
        font-family:KyoboHand;
        color:#4b4b4b;
        caret-color: transparent;
    }
  }
`

/*그림판 container*/
export const Canvas = styled.div`
  background: white;
  border-bottom-left-radius:10px;
  border-bottom-right-radius: 10px;
  @media screen and (min-width: 1401px), screen and (min-height: 701px) {
    width: 500px;   
    height: 290px;
  }
  @media screen and (max-width: 1400px), screen and (max-height: 700px) {
    width: 400px;   
    height: 232px;
  }
`

/*버튼 컨테이너(그림 편집)*/
export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  @media screen and (min-width: 1401px), screen and (min-height: 701px) {
    margin: 7px;
    width: 500px;
    height: 25px;
  }
  @media screen and (max-width: 1400px), screen and (max-height: 700px) {
    margin: 4.8px;
    width: 400px;
    height: 20px;
  }
`
export const Modebutton = styled.button`
  text-align: center;
  background-color: transparent;
  margin-right: 1.5%;
  border: 2px solid black;
  transition: box-shadow 250ms ease-in-out, color 200ms ease-in-out;
  font-family:KyoboHand;
  padding-bottom:0.5%;
  @media screen and (min-width: 1401px), screen and (min-height: 701px) {
    padding-top:3px;
    width: 75px;
    height: 27px;
    border-radius: 20px;
    font-size: 13px;
    &:hover{
      box-shadow: 0 0 40px 40px  #404040 inset;
      color: white;
      border:none;
    }
  }
  @media screen and (max-width: 1400px), screen and (max-height: 700px) {
    padding-top:2.4px;
    width: 60px;
    height: 21px;
    border-radius: 16px;
    font-size: 10px;
    &:hover{
      box-shadow: 0 0 32px 32px  #404040 inset;
      color: white;
      border:none;
    }
  }
`

export const Savebutton = styled.button`

  background-color: black;
  color: white;
  text-align: center;
  border: none;
  margin-left: auto;
  padding-bottom:0.5%;
  overflow: hidden;
  transition: box-shadow, color 300ms ease-in-out;
  font-family:KyoboHand;
  &:hover{
    color: rgb(54, 54, 54);
    background-color: transparent;
    border: 3px solid rgb(54, 54, 54);
  }
  @media screen and (min-width: 1401px), screen and (min-height: 701px) {
    border-radius: 15px;
    padding-top:3px;
    font-size: 15px;
    width: 100px;
    height: 27px;
  }
  @media screen and (max-width: 1400px), screen and (max-height: 700px) {
    border-radius: 12px;
    padding-top:2.4px;
    font-size: 12px;
    width: 80px;
    height: 21px;
  }
`
/*내용 container*/
export const Content = styled.div`
  @media screen and (min-width: 1401px), screen and (min-height: 701px) {
    width: 500px;
    height: 280px;
  }
  @media screen and (max-width: 1400px), screen and (max-height: 700px) {
    width: 400px;
    height: 224px;
  }
`