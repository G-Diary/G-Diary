import React, {useState, useEffect, useRef, Fragment} from 'react';
import {Stage, Layer, Line, Image, Transformer, Circle} from 'react-konva';
import { useStore } from '../../store/store';
import useImage from 'use-image';
import {BsFillCircleFill, BsFillEraserFill } from 'react-icons/bs';
import { FaUndoAlt } from 'react-icons/fa';

interface RectangleProps{
  image: string;
  shapeProps:{
    x:number;
    y:number;
    width: number;
    height: number;
    fill: string;
    id: string;
  };
  draggable: boolean;
  isSelected: boolean;
  unSelectShape?: any;
  onSelect: any;
  onChange?: any;
  onDelete?: any;
  onClick?: any;
}

const Rectangle = ({ image, shapeProps,draggable, isSelected, unSelectShape, onSelect, onChange, onDelete, onClick}:RectangleProps) => {
  const shapeRef = useRef<any>();
  const trRef = useRef<any>();
  const [img] = useImage(image,'anonymous');
  const deleteBtn=useRef<any>();
  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);
  const handleDelete = () =>{
    unSelectShape(null);
    onDelete(shapeRef.current);
  }
  return (
    <Fragment>
      <Image
        image={img}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable={draggable}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y()
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY)
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        >
          <Circle
            radius={8}
            fill="red"
            ref={deleteBtn}
            onClick={handleDelete}
            x={img===undefined?0:Math.max(shapeRef.current.width())*1}
          ></Circle>
        </Transformer>
      )}
    </Fragment>
  );
};

interface DrawingProps{
  grim: boolean;
}

interface GrimImageProps{
  id: string;
  img: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
}

function Drawing(props:DrawingProps){
  const {choiceImg, setUpdateCanvas}=useStore();
  const [grimimage, setGrimimage] = useState<GrimImageProps[]>([]);
  const [selectedId, selectShape] = useState(null);
  const [tool, setTool] = useState<string>('pen');
  const [currentColor,setColor]=useState<string>('#000000');
  const listColors:string[]=['black','red','blue']
  const [lines, setLines] = useState([]);
  let stageRef=useRef(null);
  const isDrawing = useRef<boolean>(false);
  const checkDeselect = (e:any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  
  useEffect(() => {
    setGrimimage([...grimimage, ...choiceImg.map(item=>{
      return{
        id:item.id,
        img: item.img,
        x:item.x,
        y:item.y,
        width:item.width,
        height: item.height,
        fill:''
      }
    })]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choiceImg]);
  const handleMouseDown = (e:any) => {
    // debugger;
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y],color:currentColor }]);
  };
  const handleMouseMove = (e:any) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    if (!lastLine || !lastLine.points) {
      // create a new line if lines is empty or lastLine is undefined
      lastLine = { points: [] };
      setLines([...lines, lastLine]);
    }
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    // replace last
    // lines.splice(lines.length - 1, 1, lastLine);
    setLines([...lines.slice(0, -1),lastLine]);
  };
  const handleMouseUp = () => {
    isDrawing.current = false;
  };
  const handleUndo = () => {
    setLines(lines.slice(0, -1));
  };

  const handleExport = () =>{
    const stage = stageRef.current;
    if(stage){
      const dataUrl=stage.toDataURL({
        mimeType:'image/png',
        crossorigin:'anonymous'
      },0.5);
      setUpdateCanvas(dataUrl);
    }
  }
  const handleRemove=(index:any)=>{
    const newList=grimimage.filter((item)=> item.id !== index);
    setGrimimage(newList);
  }
  const unSelectShape = (prop:any)=>{
    selectShape(prop);
  };
  const onDeleteImage = (node:any)=>{
    const newImage = [...grimimage];
    newImage.splice(node.index,1);
    setGrimimage(newImage);

  }
  return(
    <div>
      {props.grim?(
        <Stage
          ref={stageRef}
          width={500}
          height={290}
          onMouseDown={(e) => {      
            checkDeselect(e);
          }}
          onTouchStart={(e) => {
            checkDeselect(e);
          }}
          onMouseLeave={handleExport}
        >
          <Layer>
            {grimimage && grimimage.map((rect, i) => {
              console.log(grimimage)
              return (
                <Rectangle
                  key={i}
                  image={rect.img}
                  shapeProps={rect}
                  isSelected={rect.id === selectedId}
                  unSelectShape={(e:any)=>{unSelectShape(e)}}
                  draggable={true}
                  onClick={handleRemove}
                  onSelect={() => {
                    selectShape(rect);
                  }}
                  onChange={(newAttrs: GrimImageProps) => {
                    const rects = grimimage.slice();
                    rects[i] = newAttrs;
                    setGrimimage(rects);
                  }}
                  onDelete={onDeleteImage}
                />
              );
            })}
            {lines && lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke={line.color}
                strokeWidth={5}
                tension={0.5}
                lineCap="round"
                globalCompositeOperation={
                  line.tool === 'eraser' ? 'destination-out' : 'source-over'
                }
              />
            ))}
          </Layer>
        </Stage>
      ):( <Stage
        ref={stageRef}
        width={500}
        height={290}
        onMouseDown={(e) => {      
          handleMouseDown(e);
          checkDeselect(e);
        }}
        onTouchStart={(e) => {
          handleMouseDown(e);
          checkDeselect(e);
        }}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        onTouchMove={(e) => {
          handleMouseMove(e);
        }}
        onTouchEnd={() => {
          handleMouseUp();
        }}
        onMouseLeave={handleExport}
      >
        <Layer>
          {grimimage && grimimage.map((rect, i) => {
            return (
              <Rectangle
                key={i}
                image={rect.img}
                shapeProps={rect}
                isSelected={rect.id === selectedId}
                draggable={false}
                onSelect={() => {
                  selectShape(rect.id);
                }}
                onChange={(newAttrs: any) => {
                  const rects = grimimage.slice();
                  rects[i] = newAttrs;
                  setGrimimage(rects);
                }}
              />
            );
          })}
          {lines && lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.color}
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>
      </Stage>)}
      {!props.grim?(
        <div style={{transform:'translate(68%,-100%)'}}>
          {listColors && listColors.map((map,index)=>{
            return(
              <BsFillCircleFill key={index} color={map} size="23" style={{marginRight:'8px'}} onClick={()=>{
                setTool('pen');
                setColor(map);
              }} />
            )
          })}
          <BsFillEraserFill size="26" style={{marginRight: '10px'}} onClick={()=>{
            setTool('eraser');
          }} />
          <FaUndoAlt size="22" style={{marginRight:'10px'}} onClick={handleUndo}/>
        </div>):('')}
    
    </div>
  )
}
export default Drawing;