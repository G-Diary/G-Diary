import { Button, makeStyles } from '@material-ui/core';
import ResultManuscript from './ResultManuscript';
import { BsBrightnessHighFill, BsFillCloudFill ,BsFillCloudSnowFill, BsFillCloudRainFill } from 'react-icons/bs';
import { Content, DateContainer, Dateline, Datetitle, DiviContainer, Weathercontainer, DateContent, TitleContainer, Title, Titlecontent, Canvas} from '../diary/DiaryContent';
import { ChoiceButtonContainer } from '../diary/GrimChoice';
import api from '../../apis/axios'

const useStyles = makeStyles(() => ({
  customHoverFocus: {
    '&:hover, &.Mui-focusVisible': { backgroundColor: 'black', color: 'white' },
  },
}));

interface DiaryListProps{
  id: number;
  title: string;
  weather: number;
  draw: string;
  contents: string;
  date: string;
  emoji: string;
}

type Props = {
  dismiss: string,
  isConfirmed: boolean,
  isDenied: boolean,
  isDismissed : boolean
}

function DiaryList({id, title, weather, draw, contents, date, emoji}:DiaryListProps){
  let fulldate=date.split('-');
  let year=fulldate[0];  //연도 구하기
  let todayMonth=fulldate[1];  //월 구하기
  let todayDate=fulldate[2];  //일 구하기

  const classes = useStyles();
  // function shareMessage() {
  //   window.Kakao.Share.sendDefault({
  //     objectType: 'feed',
  //     content: {
  //       title: title,
  //       description: contents,
  //       // 일기에서 그린 그림 url 주소 하고 싶어영
  //       imageUrl: draw,
  //       link: {
  //       // 도메인 주소 정해지면 그거 넣으면 될 것 같아여
  //         mobileWebUrl: 'http://localhost',
  //         webUrl: 'http://localhost',
  //       },
  //     },
  //   });
  // }
  const DeleteDiary = () => {
    const Swal = require('sweetalert2');
    Swal.fire({
      title: '정말 삭제하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '네',
      cancelButtonText: '아니오'
    }).then((result: Props) => {
      console.log(result)
      if (result.isConfirmed) {
        Swal.fire({
          title: '삭제 성공!',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        }).then((result: Props) => {
          if (result.isConfirmed) {
            api.delete(`diaries/${id}/`).then((res) => {
              window.location.reload();
            }).catch((err) => {
              console.log(err)
            })
          }
        })
      }
    })
    
  }
  function Weather() {
    return(
      <>
        <BsBrightnessHighFill size='27' color={weather===1 ? 'red' : 'grey'} />
        <BsFillCloudFill size='27' color={weather===2 ? '#4E5D79' : 'grey'} />
        <BsFillCloudRainFill size='26' color={weather===3 ? '#5A5A5A' : 'grey'} style={{paddingTop: '1.5px'}} />
        <BsFillCloudSnowFill size='25' color={weather===4 ? '#FFFAFA' : 'grey'} style={{paddingTop: '2px'}}/>
      </>
    )
  }

  return(
    <DiviContainer>
      <DateContainer>
        <Dateline>
          <Datetitle>날짜</Datetitle>
          <DateContent style={{width: '9rem', fontSize:'1.5rem'}}>{year}.{todayMonth}.{todayDate}</DateContent>
          <Weathercontainer>
            <Weather/>
          </Weathercontainer>
        </Dateline>
      </DateContainer>
      <TitleContainer>
        <Title>제목:</Title>
        <Titlecontent style={{fontSize: '1.5rem'}}>{title}</Titlecontent>
        <div style={{width:'1em', fontSize:'1.8em',marginLeft: '460px'}}>{emoji}</div>
      </TitleContainer>
      <Canvas><img src={draw} alt='diarygrim' style={{ width: '500px', height: '290px' }} /></Canvas>
      <div>
        <Button onClick={DeleteDiary}>삭제</Button>
        <ChoiceButtonContainer style={{height: '25px' ,marginTop:'2%', marginLeft:'2.2%'}}>
          <Button
          // onClick={shareMessage}
            className={classes.customHoverFocus}
            type='button'
            variant='outlined'
            style={{
              position: 'relative',
              top:'4px',
              right: '10px',
              borderRadius: '30px',
              border: '2px solid black',
              fontWeight: 'bolder',
            }}
          >
        카카오톡 공유하기
          </Button>
        </ChoiceButtonContainer>
      </div>
      <Content><ResultManuscript content={contents}/></Content>
    </DiviContainer>
  )
}

export default DiaryList;
