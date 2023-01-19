import React from 'react';
import ResultManuscript from './ResultManuscript';
import { BsBrightnessHighFill, BsFillCloudFill ,BsFillCloudSnowFill, BsFillCloudRainFill } from 'react-icons/bs';
import { Content, DateContainer, Dateline, Datetitle, DiviContainer, Weathercontainer, DateContent, TitleContainer, Title, Titlecontent, Canvas, Modebutton } from './DiaryContent';
import { ChoiceButtonContainer } from './GrimChoice';


function DiaryList({key, title, weather, draw, contents, date, emoji}){
  
  console.log(key)
  console.log(title)
  console.log(weather)
  console.log(draw)
  console.log(contents)
  console.log(date)
  console.log(emoji)

  let fulldate=date.split('-');
  let year=fulldate[0];  //연도 구하기
  let todayMonth=fulldate[1];  //월 구하기
  let todayDate=fulldate[2];  //일 구하기

  return(
    <DiviContainer>
      <DateContainer>
        <Dateline>
          <Datetitle>DATE</Datetitle>
          <DateContent style={{width: '9rem'}}>{year}.{todayMonth}.{todayDate}</DateContent>
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
        <Title>Title:</Title>
        <Titlecontent>{title}</Titlecontent>
        <img src={`${emoji}`} alt="emoji" style={{width:'1em', fontSize:'1.8em'}}/>
      </TitleContainer>
      <Canvas><img src={draw} alt="diarygrim" style={{width:'500px', height:'270px'}}/></Canvas>
      <ChoiceButtonContainer style={{height: '25px' ,marginTop:'2%', marginLeft:'2.2%'}}>
        <Modebutton style={{width: '130px', height:'30px'}}>Post on SNS</Modebutton>
      </ChoiceButtonContainer>
      <Content><ResultManuscript content={contents}/></Content>
    </DiviContainer>
  )
}

export default DiaryList;