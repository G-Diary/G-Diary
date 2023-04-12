import React, {useState} from 'react';
import styled from 'styled-components';

/* 원고지 틀 컴포넌트 */
function Manuscript(props:any) {
  const [word, setWord] = useState<string>('');
  const Swal = require('sweetalert2');
  let tr:number[] = Array.apply(null, new Array(5)).map(Number.prototype.valueOf, 0);
  let td:number[] = Array.apply(null, new Array(10)).map(Number.prototype.valueOf, 0);

  const textlist = tr.map((tr,index:number) => (
    <div style={{display: 'flex'}} key={index}>
      {td.map((td,index1:number) => (
        <TableTd key={index1}><div style={{paddingTop:'5px'}}>{word[index1 + 10 * index]}</div></TableTd>
      ))}
    </div>
  ));

  function wordInput(e:any) {
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
    <div style={{marginTop:'13px', marginLeft:'3px'}}>
      <PaperContainer>
        <GridContent spellCheck="false" id="word" value={word} onChange={wordInput}/>
        <label htmlFor='word'>
          {textlist}  
        </label>
      </PaperContainer>
    </div>
  );
}

export default Manuscript;

export const PaperContainer = styled.div`
  --line-length: 10;
  box-sizing: content-box;
  border: 2px groove transparent;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: calc(var(--line-length));
  font-size: calc(450px / var(--line-length) / 1.5);
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
  margin-top: 20px;
  margin-left: 9px;
`

export const GridContent =styled.textarea`
  position: absolute;
  width: 520px;
  height: 280px;
  background-color: rgba(0, 0, 0, 0);
  letter-spacing:33px;
  padding-left: 25px;
  line-height: 60px;
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
  top: -800px;
`

export const TableTd =styled.div`
  border: 1px solid black;
  width: 47.3px;
  height: 47.3px;
  font-size: 30px;
  text-align: center;
  z-index: 1;
  margin-bottom: 5px;
  margin:1px;
`