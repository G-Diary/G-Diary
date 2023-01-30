import React from 'react';
import { PaperContainer, TableTd } from './Manuscript';
/* 리스트 원고지 틀 컴포넌트 */
function ResultManuscript({content}) {
  const divi=content.split('');
  let tr = Array.apply(null, new Array(5)).map(Number.prototype.valueOf, 0);
  let td = Array.apply(null, new Array(10)).map(Number.prototype.valueOf, 0);
  const textlist = tr.map((tr,index) => (
    <div style={{display: 'flex'}} key={index}>
      {td.map((td,index1) => (
        <TableTd key={index1}><div style={{paddingTop:'5px'}}>{divi[index1 + 10 * index]}</div></TableTd>
      ))}
    </div>
  ));

  return (
    <div style={{'@media screen and (min-width: 1401px), screen and (min-height: 701px)' :{
      marginTop:'9px', marginLeft:'7px'
    },
    '@media screen and (max-width: 1400px), screen and (max-height: 700px)' :{
      marginTop:'7.2px', marginLeft:'5.6px'
    }}}>
      <PaperContainer>
        <label>
          {textlist}
        </label>
      </PaperContainer>
    </div>
  );
}
export default ResultManuscript;
