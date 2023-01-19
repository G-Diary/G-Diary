import React, {
  Fragment,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {Stage, Layer, Image, Transformer} from 'react-konva';
import useImage from 'use-image';
import { useStore } from '../../store/store';


const Rectangle = ({ img, shapeProps, isSelected, onSelect, onChange }) => {
  const [image] = useImage(img.src);
  const shapeRef = useRef();
  //   console.log(shapeRef);
  let {currentCanvas}=useStore();
  const trRef = useRef();
  console.log(trRef);
  useEffect(() => {
    if (isSelected) {
      trRef.current.setNode(currentCanvas.current);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected, currentCanvas]);
  
  useLayoutEffect(() => {
    currentCanvas.current.cache();
  }, [shapeProps, image, isSelected, currentCanvas]);
  
  return (
    <Fragment>
      <Image
        image={image}
        onClick={onSelect}
        ref={currentCanvas}
        blurRadius={10}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({ ...shapeProps, x: e.target.x(), y: e.target.y() });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          node.width(Math.max(5, node.width() * scaleX));
          node.height(Math.max(node.height() * scaleY));
  
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: node.width(),
            height: node.height(),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
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
  
const initialRectangles = [
  { x: 10, y: 10, width: 100, height: 100, id: 'rect1' },
];
  
function Reposition({move}) {
  const [rectangles, setRectangles] = useState(initialRectangles);
  console.log(rectangles);
  const [selectedId, selectShape] = useState(null);
  //   const [images, setImages] = useState([]);
  const {choiceImg}=useStore();
  console.log(choiceImg);
  //   const onChange = (e) => {
  //     e.preventDefault();
  //     addImage(e.target);
  //   };
  
  //   const addImage = (srcImg) => {
  //     // const newimage = new Image();
  //     setImages(srcImg);
  //   };
  return (
    <>
      {/* <img
        id="image"
        src="https://cdn-icons-png.flaticon.com/512/5650/5650367.png"
        alt="star"
        draggable="true"
        style={{
          width: '40px',
          height: '40px',
          transform: 'translate(-80%,80%)',
        }}
        onClick={onChange}
      />
   */}
      <Stage style={{width:'512px', height: '270px'}}
        width={498}
        height={270}
        onMouseDown={(e) => {
          const clickedOnEmpty = e.target === e.target.getStage();
          if (clickedOnEmpty) {
            selectShape(null);
          }
        }}
      >
        <Layer>
           
          {rectangles.map((rect, i) => {
            return (
              <Rectangle
                key={i}
                img={choiceImg}
                shapeProps={rect}
                isSelected={rect.id === selectedId}
                onSelect={() => {
                  selectShape(rect.id);
                }}
                onChange={(newAttrs) => {
                  console.log(newAttrs);
                  const rects = rectangles.slice();
                  rects[i] = newAttrs;
                  setRectangles(rects);
                }}
              />
            );
          })}
        </Layer>
      </Stage>
      
    
    </>
  );
}
export default Reposition;
  