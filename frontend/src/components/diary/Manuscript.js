import React, { useState, useRef } from 'react';
import './Manuscript.css';

function Manuscript() {
  const [content, setContent] = useState('');
  const N = 5;
  let tr = Array.apply(null, new Array(5)).map(Number.prototype.valueOf, 0);
  let td = Array.apply(null, new Array(10)).map(Number.prototype.valueOf, 0);
  console.log(tr.length);
  console.log(td.length);
  const handleContent = (e) => {
    setContent(e.target.value);
  };
  const textlist = tr.map((index) => (
    <tr className='tr'>
      {td.map((index) => (
        <td className="td"></td>
      ))}
    </tr>
  ));
  return (
    <div>
      <div className="sm-paper">
        <table className="table">
          <tbody>
            <textarea
              type="text"
              value={content}
              maxlength="60"
              className="grid__content"
              onChange={handleContent}
            ></textarea>
            {textlist}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Manuscript;
