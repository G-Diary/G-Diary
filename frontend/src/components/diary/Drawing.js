import React, {useRef, useEffect, useState} from 'react';
import { useStore } from '../../store/store';
import { BsEraserFill } from 'react-icons/bs';
import {BsFillCircleFill } from 'react-icons/bs';
import { FaUndoAlt } from 'react-icons/fa';
import {Stage, Layer, Line} from 'react-konva';

function Drawing({grim}){
  const [tool, setTool]=useState('pen');
  const [lines,setLines]=useState([]);
  const [savedDrawing, setSavedDrawing]=useState('');
  const [currentColor,setColor]=useState('#000000');
  const listColors=['black','red','blue']
  const isDrawing=useRef(false);
  // const {setCurrentCanvas,setUpdateCanvas}=useStore();
  let stageRef=useRef(null);
 
  // useEffect(()=>{
  //   setCurrentCanvas(stageRef); 
  // },[]);

  const handleMouseDown = (e)=>{
    debugger;
    const pos=e.target.getStage().getPointerPosition();
    setLines([...lines, {tool, points:[pos.x,pos.y],color:currentColor}]);
    isDrawing.current=true;
    console.log(lines)
  };

  const handleMouseMove= (e)=>{
    if(!isDrawing.current){
      return;
    }
    const stage=e.target.getStage();
    const point=stage.getPointerPosition();
    console.log(point);
    let lastLine=lines[lines.length-1];
    lastLine.color=currentColor;
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    lines.splice(lines.length-1,1,lastLine);
    setLines(lines.concat());
    console.log(lines);
  }
  const handleMouseUp = () =>{
    isDrawing.current=false;
  }
  const handleExport = () =>{
    const dataUrl=stageRef.toDataURL();
    setSavedDrawing(dataUrl);
  }

  const handleUndo = () =>{
    setLines(lines.slice(0,-1));
  }
 
  return( 
    <>
      {!grim? (
        <>
          <div>
            <Stage 
              ref={(ref)=>(stageRef=ref)}
              width={498}
              height={243}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseup={handleMouseUp}
              onTouchStart={(e)=>{
                console.log(e);
                handleMouseDown(e);
              }}
              onTouchMove={(e)=>{
                handleMouseMove(e);
              }}
              onTouchEnd={(e)=>{
                handleMouseUp(e);
              }}
            >
              <Layer>
                {lines.map((map, i)=>(
                  <Line
                    key={i}
                    points={map.points}
                    stroke={map.color}
                    strokeWidth={5}
                    tension={0.5}
                    lineCap="round"
                    globalCompositeOperation={
                      map.tool==='eraser' ?'destination-out':'source-over'
                    }
                  />
                ))}
              </Layer>
            </Stage>
          </div>
          <div style={{ display:'flex', justifyContent:'flex-end',alignContent:'center'}}>
            {listColors && listColors.map((map,index)=>{
              return(
                <BsFillCircleFill key={index} color={map} size="23" style={{marginRight:'8px'}} onClick={()=>{
                  setTool('pen');
                  setColor(map);
                }} />
              )
            })}
            <FaUndoAlt size="23" style={{marginRight:'10px'}} onClick={handleUndo}/>
            {/* <BsEraserFill size="27" style={{marginRight: '10px', Bottom:'10px'}} onClick={()=>{
          setTool('eraser');
        }} /> */}
          </div>
        </>
      ):(
        // <div onChange={handleExport}>
        //   {savedDrawing && <img src={savedDrawing} width={493} height={243} alt="result" />}  
        // </div>
        '')}
    </>
  )
  
}

export default Drawing;

// const [ctx, setCtx] = useState();  //canvas
// const canvasRef = useRef(null);
// const [isDrawing, setIsDrawing] = useState(!{grim}); //그리기 모드 여부판단
// const {setCurrentCanvas,setUpdateCanvas}=useStore();

// useEffect(() => {
//   const canvas = canvasRef.current;
//   const context = canvas.getContext('2d');
//   context.strokeStyle = 'black'; //중복 속성
//   context.lineWidth = 1.5;
//   context.lineJoin = 'round';
//   setCurrentCanvas(context); 
//   setUpdateCanvas(canvasRef.current);
//   setCtx(context);
// }, []);

// //그림 그리기 동작 모드 ON
// const startDrawing = ({ nativeEvents }) => {
//   setIsDrawing(true);
// };
// //그림 그리기 동작 모드 OFF
// const finishDrawing = () => {
//   setIsDrawing(false);
// };

// //그림 그리기
// const drawing = ({ nativeEvent }) => {
//   const { offsetX, offsetY } = nativeEvent;
//   if (ctx) {
//     if (!isDrawing) {
//       ctx.beginPath();
//       ctx.moveTo(offsetX, offsetY);
//     } else {
//       ctx.lineTo(offsetX, offsetY);
//       ctx.stroke();
//     }
//   }
// };

// //캔버스 위 마우스 클릭 좌표 확인
// const clickXY = (e) => {
//   const x = e.clientX - e.target.offsetLeft;
//   console.log(x);
//   const y = e.clientY - e.target.offsetTop;
//   console.log(y);
// };

//그림 이미지화
//   const saveAsPNG = () => {
//     // const image = canvasRef.current.toDataURL('image/png');
//     // console.log(image);
//     // console.log(image.width);
//     save(canvasRef.current);
//   };

{/* <div style={{width:'512px', height: '270px'}}>
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

</div>) */}