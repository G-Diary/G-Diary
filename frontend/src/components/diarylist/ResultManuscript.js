import { Button, makeStyles } from '@material-ui/core';
import React from 'react';
import { PaperContainer, TableTd } from './Manuscript';
import api from '../../apis/axios';

const useStyles = makeStyles((theme) => ({
  customHoverFocus: {
    '&:hover, &.Mui-focusVisible': { backgroundColor: 'black', color: 'white' },
  },
}));

/* 리스트 원고지 틀 컴포넌트 */
function ResultManuscript({ content }) {
  const classes = useStyles();
  const divi = content.split('');
  let tr = Array.apply(null, new Array(5)).map(Number.prototype.valueOf, 0);
  let td = Array.apply(null, new Array(10)).map(Number.prototype.valueOf, 0);
  const textlist = tr.map((tr, index) => (
    <div style={{ display: 'flex' }} key={index}>
      {td.map((td, index1) => (
        <TableTd key={index1}>
          <div style={{ paddingTop: '5px' }}>{divi[index1 + 10 * index]}</div>
        </TableTd>
      ))}
    </div>
  ));

  function shareMessage() {
    api
      .get(`diaries/${sessionStorage.getItem('id')}`)
      .then(function (res) {
        console.log(res);
        window.Kakao.Share.sendDefault({
          objectType: 'feed',
          content: {
            title: '내 일기 어때?',
            description: '너도 쓰러 와!',
            // 일기에서 그린 그림 url 주소 하고 싶어영
            imageUrl: res.data.drawing_url,
            link: {
              // 도메인 주소 정해지면 그거 넣으면 될 것 같아여
              mobileWebUrl: 'http://localhost:3000/',
              webUrl: 'http://localhost:3000/',
            },
          },
        });
      })
      .catch(function (res) {});
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
        position: 'relative',
        bottom: '25.5px',
        marginLeft: '7px',
      }}
    >
      <Button
        onClick={shareMessage}
        className={classes.customHoverFocus}
        type='button'
        variant='outlined'
        style={{
          position: 'relative',
          bottom: '3.5px',
          right: '10px',
          borderRadius: '30px',
          border: '2px solid black',
          fontWeight: 'bolder',
        }}
      >
        카카오톡 공유하기
      </Button>
      <PaperContainer>
        <label>{textlist}</label>
      </PaperContainer>
    </div>
  );
}
export default ResultManuscript;
