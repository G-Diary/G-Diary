import React, { useState, useRef } from 'react';
import styled from 'styled-components';

/* 원고지 틀 컴포넌트 */
function Manuscript() {
  const [content, setContent] = useState('');
  let tr = Array.apply(null, new Array(5)).map(Number.prototype.valueOf, 0);
  let td = Array.apply(null, new Array(10)).map(Number.prototype.valueOf, 0);
  const handleContent = (e) => {
    setContent(e.target.value);
  };
  console.log()
  const textlist = tr.map((tr,index) => (
    <tr className='tr' key={index}>
      {td.map((td,index) => (
        <TableTd key={index}></TableTd>
      ))}
    </tr>
  ));
  return (
    <div>
      <PaperContainer>
        <GridContent
          type="text"
          value={content}
          maxlength="60"
          onChange={handleContent}
        ></GridContent>
        <PaperTable>
          <tbody>
            {textlist}
          </tbody>
        </PaperTable>
      </PaperContainer>
    </div>
  );
}

export default Manuscript;

const PaperContainer = styled.div`
  --line-length: 10;
  box-sizing: content-box;
  border: 2px groove transparent;
  /* background-color: white; */
  display: flex;
  /* padding: 0.2em 0; */
  flex-direction: row;
  flex-wrap: wrap;
  width: calc(var(--line-length));
  font-size: calc(450px / var(--line-length) / 1.5);
`
const PaperSpan = styled.div`
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
  margin:0.2em 0;
`

const GridContent =styled.textarea`
  position: absolute;
  width: 520px;
  height: 280px;
  background-color: rgba(0, 0, 0, 0);
  font-size: 2rem;
  letter-spacing: 31.5px;
  padding-left: 21px;
  line-height: 59px;
  z-index: 20;
  word-break: break-all;
  resize: none;
  border: none;
  outline: none;
  overflow: clip;
  caret-color: transparent;
`
const PaperTable =styled.table`
  margin: 0 auto;
`

const TableTd =styled.td`
  box-sizing: border-box;
  flex: 1 0 auto;
  vertical-align: middle;
  display: inline-flex;
  flex-wrap: nowrap;
  align-content: center;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 1.5em;
  height: 1.5em;
  border: 2px double black;
  margin: 0.2em 0;
  border-spacing: 20px;
  border-collapse: separate;
  margin-right: 2.5px;
  margin-left: 2.5px;
`
