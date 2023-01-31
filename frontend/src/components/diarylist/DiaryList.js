import React from 'react';
import ResultManuscript from './ResultManuscript';
import { BsBrightnessHighFill, BsFillCloudFill ,BsFillCloudSnowFill, BsFillCloudRainFill } from 'react-icons/bs';
import { Content, DateContainer, Dateline, Datetitle, DiviContainer, Weathercontainer, DateContent, TitleContainer, Title, Titlecontent, Canvas} from '../diary/DiaryContent';
import { ChoiceButtonContainer } from '../diary/GrimChoice';


function DiaryList({title, weather, draw, contents, date, emoji}){

  let fulldate=date.split('-');
  let year=fulldate[0];  //연도 구하기
  let todayMonth=fulldate[1];  //월 구하기
  let todayDate=fulldate[2];  //일 구하기

  return(
    <DiviContainer>
      <DateContainer>
        <Dateline>
          <Datetitle>날짜</Datetitle>
          <DateContent style={{width: '9rem', fontSize:'1.5rem'}}>{year}.{todayMonth}.{todayDate}</DateContent>
          <Weathercontainer>
            {weather===1?(
              <>
                <BsBrightnessHighFill size="27" color='red' />
                <BsFillCloudFill size="27" color="grey" />
                <BsFillCloudRainFill size="26" color="grey" style={{paddingTop: '1.5px'}} />
                <BsFillCloudSnowFill size="25" color='grey' style={{paddingTop: '2px'}}/>
              </>
            ):weather===2?(
              <>
                <BsBrightnessHighFill size="27" color='grey' />
                <BsFillCloudFill size="27" color="#4E5D79" />
                <BsFillCloudRainFill size="26" color="grey" style={{paddingTop: '1.5px'}} />
                <BsFillCloudSnowFill size="25" color='grey' style={{paddingTop: '2px'}}/>
              </>
            ):weather===3?(
              <>
                <BsBrightnessHighFill size="27" color='grey' />
                <BsFillCloudFill size="27" color="grey" />
                <BsFillCloudRainFill size="26" color="#5A5A5A" style={{paddingTop: '1.5px'}} />
                <BsFillCloudSnowFill size="25" color='grey' style={{paddingTop: '2px'}}/>
              </>
            ):weather===4?(
              <>
                <BsBrightnessHighFill size="27" color='grey' />
                <BsFillCloudFill size="27" color="grey" />
                <BsFillCloudRainFill size="26" color="grey" style={{paddingTop: '1.5px'}} />
                <BsFillCloudSnowFill size="25" color='#FFFAFA' style={{paddingTop: '2px'}}/>
              </>
            ):(<>
              <BsBrightnessHighFill size="27" color='grey' />
              <BsFillCloudFill size="27" color="grey" />
              <BsFillCloudRainFill size="26" color="grey" style={{paddingTop: '1.5px'}} />
              <BsFillCloudSnowFill size="25" color='grey' style={{paddingTop: '2px'}}/>
            </>)}          
          </Weathercontainer>
        </Dateline>
      </DateContainer>
      <TitleContainer>
        <Title>제목:</Title>
        <Titlecontent style={{fontSize: '1.5rem'}}>{title}</Titlecontent>
        <div style={{width:'1em', fontSize:'1.8em',marginLeft: '460px'}}>{emoji}</div>
      </TitleContainer>
      <Canvas><img src={draw} alt="diarygrim" style={{width:'500px', height:'290px'}}/></Canvas>
      <ChoiceButtonContainer style={{height: '25px' ,marginTop:'2%', marginLeft:'2.2%'}}>
      </ChoiceButtonContainer>
      <Content><ResultManuscript content={contents}/></Content>
    </DiviContainer>
  )
}

export default DiaryList;
