import React, {useState} from 'react';
import styled from 'styled-components';

/* 원고지 틀 컴포넌트 */
function Manuscript(props) {
  const [word, setWord] = useState('');
  const Swal = require('sweetalert2');
  let tr = Array.apply(null, new Array(5)).map(Number.prototype.valueOf, 0);
  let td = Array.apply(null, new Array(10)).map(Number.prototype.valueOf, 0);

  const textlist = tr.map((tr,index) => (
    <div style={{display: 'flex'}} key={index}>
      {td.map((td,index1) => (
        <TableTd key={index1}><div style={{paddingTop:'5px'}}>{word[index1 + 10 * index]}</div></TableTd>
      ))}
    </div>
  ));

  function wordInput(e) {
    setWord(e.target.value)
    props.setContent(e.target.value);
    if(word.length > 50) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '50글자 이하로 작성해 주세요.',
        showConfirmButton: false,
        timer: 2000
      })
      setWord(word => word.substring(0, 50))
    }
  }
  return (
    <div style={{'@media screen and (min-width: 1401px), screen and (min-height: 701px)' :{
      marginTop:'17px', marginLeft:'7px'
    },
    '@media screen and (max-width: 1400px), screen and (max-height: 700px)' :{
      marginTop:'14.4px', marginLeft:'5.6px'
    }
    }}>
      <PaperContainer>
        <GridContent spellCheck="false" id="word" type="text" value={word} onChange={wordInput}/>
        <label htmlFor='word'>
          {textlist}  
        </label>
      </PaperContainer>
    </div>
  );
}

export default Manuscript;

export const PaperContainer = styled.div`
  box-sizing: content-box;
  border: 2px groove transparent;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  @media screen and (min-width: 1401px), screen and (min-height: 701px) {
  --line-length: 10;
    width: calc(var(--line-length));
    font-size: calc(450px / var(--line-length) / 1.5);
  }
  @media screen and (max-width: 1400px), screen and (max-height: 700px) {
  --line-length: 8;
    width: calc(var(--line-length));
    font-size: calc(360px / var(--line-length) / 1.2);
  }
`
export const PaperSpan = styled.div`
  box-sizing: border-box;
  flex: 1 0 auto;
  vertical-align: middle;
  display: inline-flex;
  flex-wrap: nowrap;
  align-content: center;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width:1.5em;
  height:1.5em;
  border:1px solid red;
  border-left-width: 0px;
  @media screen and (min-width: 1401px), screen and (min-height: 701px) {
    margin-top: 20px;
    margin-left: 9px;
  }
  @media screen and (max-width: 1400px), screen and (max-height: 700px) {
    margin-top: 16px;
    margin-left: 7.2px;
  }
`

export const GridContent =styled.textarea`
  position: absolute;

  background-color: rgba(0, 0, 0, 0);

  z-index: 20;
  font-size: 1.8rem;
  word-break: break-all;
  resize: none;
  border: none;
  outline: none;
  caret-color: transparent;
  color: rgba(0, 0, 0, 0);
  text-decoration-line: none;
  z-index: -1;

  @media screen and (min-width: 1401px), screen and (min-height: 701px) {
    top: -800px;
    width: 520px;
    height: 280px;
    letter-spacing:33px;
    padding-left: 25px;
    line-height: 60px;
  }
  @media screen and (max-width: 1400px), screen and (max-height: 700px) {
    top: -640px;
    width: 416px;
    height: 224px;
    letter-spacing:26.4px;
    padding-left: 20px;
    line-height: 48px;
  }
`

export const TableTd =styled.div`
  border: 1px solid black;
  text-align: center;
  z-index: 1;
  @media screen and (min-width: 1401px), screen and (min-height: 701px) {
    margin-bottom: 5px;
    margin:1px;
    width: 45.3px;
    height: 45.3px;
    font-size: 30px;
  }
  @media screen and (max-width: 1400px), screen and (max-height: 700px) {
    margin-bottom: 4px;
    margin:1px;
    width: 35.84px;
    height: 35.84px;
    font-size: 24px;
  }
`