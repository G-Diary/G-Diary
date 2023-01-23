import React, {useState, useEffect, useRef, Fragment} from 'react';
import {Stage, Layer, Line, Image, Transformer} from 'react-konva';
import { useStore } from '../../store/store';
import useImage from 'use-image';
import {BsFillCircleFill, BsFillEraserFill } from 'react-icons/bs';
import { FaUndoAlt } from 'react-icons/fa';

const Rectangle = ({ image, shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef();
  const trRef = useRef();
  const [img] = useImage(image,'Anonymous');
  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <Fragment>
      <Image
        image={img}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
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
        />
      )}
    </Fragment>
  );
};

function Drawing({grim}){
  const {choiceImg, setUpdateCanvas}=useStore();
  const [grimimage, setGrimimage] = useState(choiceImg);
  const [selectedId, selectShape] = useState(null);
  const [tool, setTool] = useState('pen');
  const [currentColor,setColor]=useState('#000000');
  const listColors=['black','red','blue']
  const [lines, setLines] = useState([]);
  let stageRef=useRef(null);
  const isDrawing = useRef(false);
  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };
  
  useEffect(() => {
    setGrimimage([...grimimage, choiceImg]);
  }, [choiceImg]);
  const handleMouseDown = (e) => {
    // debugger;
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y],color:currentColor }]);
  };
  const handleMouseMove = (e) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };
  const handleMouseUp = () => {
    isDrawing.current = false;
  };
  const handleUndo = () => {
    setLines(lines.slice(0, -1));
  };

  const handleExport = () =>{
    const dataUrl=stageRef.current.toDataURL({
      mimeType:'image/png',
      quality:0,
      pixelRatio:2,
      crossorigin:'anonymous'
    });
    setUpdateCanvas(dataUrl);
  }

  return(
    <div>
      {/* <button onClick={handleExport}>save</button> */}
      {grim?(
        <Stage
          ref={stageRef}
          width={500}
          height={270}
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
              return (
                <Rectangle
                  key={i}
                  image={rect.img}
                  shapeProps={rect}
                  isSelected={rect.id === selectedId}
                  onSelect={() => {
                    selectShape(rect.id);
                  }}
                  onChange={(newAttrs) => {
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
        </Stage>
      ):( <Stage
        ref={stageRef}
        width={500}
        height={270}
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
        onTouchEnd={(e) => {
          handleMouseUp(e);
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
                onSelect={() => {
                  selectShape(rect.id);
                }}
                onChange={(newAttrs) => {
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
      {!grim?(
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