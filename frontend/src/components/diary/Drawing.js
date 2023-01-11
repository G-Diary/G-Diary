import React, {useRef, useEffect, useState} from 'react';
import { useStore } from '../../store/store';

const defaultStyle={
  display: 'inline-block',
}

function Drawing({grim}){
  const [ctx, setCtx] = useState();  //canvas
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(!{grim}); //그리기 모드 여부판단
  const {setCurrentCanvas,setUpdateCanvas}=useStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.strokeStyle = 'black'; //중복 속성
    context.lineWidth = 1.5;
    context.lineJoin = 'round';
    setCurrentCanvas(context); 
    setUpdateCanvas(canvasRef.current);
    setCtx(context);
  }, []);

  //그림 그리기 동작 모드 ON
  const startDrawing = ({ nativeEvents }) => {
    setIsDrawing(true);
  };
  //그림 그리기 동작 모드 OFF
  const finishDrawing = () => {
    setIsDrawing(false);
  };

  //그림 그리기
  const drawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    if (ctx) {
      if (!isDrawing) {
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
      } else {
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
      }
    }
  };

  //캔버스 위 마우스 클릭 좌표 확인
  const clickXY = (e) => {
    const x = e.clientX - e.target.offsetLeft;
    console.log(x);
    const y = e.clientY - e.target.offsetTop;
    console.log(y);
  };

  //그림 이미지화
  //   const saveAsPNG = () => {
  //     // const image = canvasRef.current.toDataURL('image/png');
  //     // console.log(image);
  //     // console.log(image.width);
  //     save(canvasRef.current);
  //   };
 
  return( 
    <div style={{width:'512px', height: '270px'}}>
      {!grim ? (
        <canvas
          id="canvas"
          className='canvas'
          width="498" 
          height="270"
          ref={canvasRef}
          style={defaultStyle}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={drawing}
          onMouseLeave={finishDrawing}
        ></canvas>
      ) : (
        <canvas
          id="canvas"
          className="canvas"
          width="498" 
          height="270"
          ref={canvasRef}
          style={defaultStyle}
          onClick={clickXY}
        ></canvas>
      )}
      
    </div>)
}

export default Drawing;
