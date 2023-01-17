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
    <tr key={index}>
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

export const PaperContainer = styled.div`
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
  margin:0.2em 0;
`

export const GridContent =styled.textarea`
  position: absolute;
  width: 520px;
  height: 280px;
  background-color: rgba(0, 0, 0, 0);
  font-size: 2rem;
  letter-spacing:33px;
  padding-left: 25px;
  line-height: 60px;
  z-index: 20;
  word-break: break-all;
  resize: none;
  border: none;
  outline: none;
  overflow: clip;
  caret-color: transparent;
  font-family:Comic Sans MS;
  text-transform: lowercase;
`
export const PaperTable =styled.table`
  margin: 0 auto;
  padding-top: 5px;
`

export const TableTd =styled.td`
  box-sizing: border-box;
  flex: 1 0 auto;
  vertical-align: middle;
  display: inline-flex;
  flex-wrap: nowrap;
  align-content: center;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 1.65em;
  height: 1.65em;
  margin-right: 1px;
  margin-left: 1px;
  border: 1.2px solid gray;
  margin: 0.15em 0;
  border-spacing: 20px;
  border-collapse: separate;

`
// margin-right: 2.5px;
// margin-left: 2.5px;