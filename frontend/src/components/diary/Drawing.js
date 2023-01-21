import React, {useRef, useEffect, useState} from 'react';
import { useStore } from '../../store/store';
import { BsEraserFill } from 'react-icons/bs';
import {BsFillCircleFill, BsFillEraserFill } from 'react-icons/bs';
import { FaUndoAlt } from 'react-icons/fa';
import {Stage, Layer, Line, Image, Transformer} from 'react-konva';
import useImage from 'use-image';

const defaultStyle={
  display: 'inline-block',
}

function Drawing({grim, save}){
  const [ctx, setCtx] = useState();  //canvas
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(!{grim}); //그리기 모드 여부판단
  const {setCurrentCanvas,setUpdateCanvas}=useStore();
  const [tool, setTool]=useState('pen');
  const [lines,setLines]=useState([]);
  const [currentColor,setColor]=useState('black');
  const listColors=['black','red','blue']
  console.log(currentColor);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.lineWidth = 2;
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
        ctx.strokeStyle=currentColor;
        ctx.lineWidth=2;
        // eslint-disable-next-line no-lone-blocks, no-unused-expressions
        {tool==='eraser'?(ctx.globalCompositeOperation='destination-out', ctx.lineWidth=8):ctx.globalCompositeOperation ='source-over';}
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
  const saveAsPNG = () => {
    // const image = canvasRef.current.toDataURL('image/png');
    // console.log(image);
    // console.log(image.width);
    save(canvasRef.current);
  };
  return( <div style={{width:'512px', height: '270px'}}>
    {!grim ? (
      <>
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
          onMouseLeave={()=>{
            finishDrawing();
            saveAsPNG();}}
        ></canvas>
        <div style={{ display:'flex', justifyContent:'flex-end',alignContent:'center', transform:'translate(0,-90%)', marginRight:'10px'}}>
          {listColors && listColors.map((map,index)=>{
            return(
              <BsFillCircleFill key={index} color={map} size="23" style={{marginRight:'8px'}} onClick={()=>{
                setColor(map);
                setTool('pencil')
              }} />
            )
          })}
          <BsFillEraserFill size="24" style={{marginRight: '10px', marginBottom: '10px'}} onClick={()=>{setTool('eraser')}}/>
        </div>
      </>
    ) : (
      <canvas
        id="canvas"
        className="canvas"
        width="498" 
        height="290"
        ref={canvasRef}
        style={defaultStyle}
        onClick={clickXY}
      ></canvas>
    )}

  </div>)

  
}

export default Drawing;


// {lines.map((map, i)=>(
//   <Line
//     key={i}
//     points={map.points}
//     stroke={map.color}
//     strokeWidth={5}
//     tension={0.5}
//     lineCap="round"
//     globalCompositeOperation={
//       map.tool==='eraser' ?'destination-out':'source-over'
//     }
//   />
// ))}




// const [tool, setTool]=useState('pen');
//   const [lines,setLines]=useState([]);
//   // const [savedDrawing, setSavedDrawing]=useState('');
//   const [currentColor,setColor]=useState('#000000');
//   const listColors=['black','red','blue']
//   const isDrawing=useRef(false);
//   let {choiceImg, setCurrentCanvas}=useStore();
//   const [selected, setSelected]=useState(false);
//   let stageRef=useRef(null);
//   const trRef = useRef();
//   console.log(choiceImg);
 
//   const [image]=useImage(choiceImg.src)
//   console.log(image);
//   const [shape, setShape]=useState({
//     width: 80,
//     height:80,
//     x:10,
//     y:10
//   });

//   const [crop, setCrop] =useState({
//     width: 80,
//     height:80,
//     x:10,
//     y:10
//   });

//   useEffect(()=>{
//     if(selected){
//       trRef.current?.nodes([stageRef.current]);
//       trRef.current?.getLayer()?.batchDraw();
//     }
//   },[selected]);

//   const getCrop=(image,newSize)=>{
//     const aspectRatio=newSize.width/newSize.height;

//     const imageRatio=image.width/image.height;

//     let newWidth=aspectRatio>=imageRatio?image.width:image.height*aspectRatio;
//     let newHeight=aspectRatio>=imageRatio?image.width/aspectRatio:image.height;
//     let x=(image.width-newWidth)/2;
//     let y=(image.height-newHeight)/2;

//     return{
//       x:x,
//       y:y,
//       width:newWidth,
//       height:newHeight
//     };
//   };

//   const transformer=(end)=>{
//     const node=stageRef.current;

//     const scaleX = node.scaleX();
//     const scaleY = node.scaleY();

//     let newWidth=Math.max(5,node.width()*scaleX);
//     let newHeight=Math.max(node.height()*scaleY);

//     if(end===false){
      
//     }else{
//       node?.width(newWidth);
//       node?.height(newHeight);
//       const crop=getCrop(
//         {width:image?.width, height:image?.height},
//         {width:newWidth, height:newHeight}
//       );
//       node.crop(crop);
//     }
//   };


//   const handleMouseDown = (e)=>{
//     // debugger;
//     const pos=e.target.getStage().getPointerPosition();
//     setLines([...lines, {tool, points:[pos.x,pos.y],color:currentColor}]);
//     isDrawing.current=true;
//     console.log(lines)
//   };

//   const handleMouseMove= (e)=>{
//     if(!isDrawing.current){
//       return;
//     }
//     const stage=e.target.getStage();
//     const point=stage.getPointerPosition();
//     console.log(point);
//     let lastLine=lines[lines.length-1];
//     lastLine.color=currentColor;
//     lastLine.points = lastLine.points.concat([point.x, point.y]);
//     lines.splice(lines.length-1,1,lastLine);
//     setLines(lines.concat());
//     console.log(lines);
//   }
//   const handleMouseUp = () =>{
//     isDrawing.current=false;
//     setCurrentCanvas(stageRef)
//   }

//   // const handleExport = () =>{
//   //   const dataUrl=stageRef.toDataURL();
//   //   setSavedDrawing(dataUrl);
//   // }

//   const handleUndo = () =>{
//     setLines(lines.slice(0,-1));
//   }
 
//   return( 
//     <>
//       <div>
//         <Stage 
//           ref={stageRef}
//           width={498}
//           height={243}
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseup={handleMouseUp}
//           onTouchStart={(e)=>{
//             console.log(e);
//             handleMouseDown(e);
//           }}
//           onTouchMove={(e)=>{
//             handleMouseMove(e);
//           }}
//           onTouchEnd={(e)=>{
//             handleMouseUp(e);
//           }}
//         >
//           <Layer>
//             <Image
//               ref={stageRef}
//               y={shape.y}
//               x={shape.x}
//               image={image}
//               scaleX={1}
//               scaleY={1}
//               width={shape.width}
//               height={shape.height}
//               crop={getCrop(
//                 {width: image?.width, height:image?.height},
//                 {width:crop.width, height:crop.height}
//               )}
//               onClick={()=>setSelected(!selected)}
//               onTransform={(e)=>{
//                 transformer(false);
//               }}
//               draggable={true}
//               rotation={30}
              
//             />
//             <Transformer
//               ref={trRef}
//               resizeEnabled={true}
//               rotateEnabled={true}
//               boundBoxFunc={(oldBox,newBox)=>{
//                 if(newBox.width<5 || newBox.height<5){
//                   return oldBox;
//                 }
//                 return newBox;
//               }}
//             />
//           </Layer>
//         </Stage>
//       </div>
//       <div style={{ display:'flex', justifyContent:'flex-end',alignContent:'center'}}>
//         {listColors && listColors.map((map,index)=>{
//           return(
//             <BsFillCircleFill key={index} color={map} size="23" style={{marginRight:'8px'}} onClick={()=>{
//               setTool('pen');
//               setColor(map);
//             }} />
//           )
//         })}
//         <FaUndoAlt size="23" style={{marginRight:'10px'}} onClick={handleUndo}/>
//         {/* <BsEraserFill size="27" style={{marginRight: '10px', Bottom:'10px'}} onClick={()=>{
//           setTool('eraser');
//         }} /> */}
//       </div>
//     </>
//   )