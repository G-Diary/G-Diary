import React, { useState, useRef } from 'react';
import { GridContent, PaperContainer, PaperTable, TableTd } from './Manuscript';

/* 리스트 원고지 틀 컴포넌트 */
function ResultManuscript({content}) {
  const divi=content.split('');
  let tr = Array.apply(null, new Array(5)).map(Number.prototype.valueOf, 0);
  let td = Array.apply(null, new Array(10)).map(Number.prototype.valueOf, 0);
  console.log()
  const textlist = tr.map((tr,tr_index) => (
    <tr key={tr_index}>
      {td.map((td,index) => (
        <TableTd key={index}>{divi[index+10*tr_index]}</TableTd>
      ))}
    </tr>
  ));
  return (
    <div>
      <PaperContainer>
        <PaperTable>
          <tbody>
            {textlist}
          </tbody>
        </PaperTable>
      </PaperContainer>
    </div>
  );
}
export default ResultManuscript;