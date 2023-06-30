import React, {useState, useRef, SetStateAction} from 'react';
import styled from 'styled-components';
import { Button, makeStyles } from '@material-ui/core';

type Props = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setSelected: React.Dispatch<React.SetStateAction<string>>
}

const useStyles = makeStyles(theme => ({
  customHoverFocus: {
    '&:hover, &.Mui-focusVisible': { backgroundColor: 'rgb(255, 215, 17)' }
  }
}));

const ChoseBtn = styled.div`
  background-color: rgb(240, 219, 109);
  border-radius: 25px;`

const InsideModal = styled.div`
  margin-top: 0;
  width: 550px;
  height: 420px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  align-items: center;
  align-content: flex-start;`

const ItemBox = styled.div`
  padding: 0px;
  margin-top: 0;
  width: 550px;
  height: 400px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;`

function OpenModal({isOpen, setIsOpen, setSelected} : Props) {
  const classes = useStyles();
  const [number, setNumber] = useState<number>();
  const [imgFile, setImgFile]=useState<string>('');
  
  function selectedImg(checked : string){
    setSelected(checked)
  }

  function Chose() {
    setIsOpen(false);
  }
    
  const imgRef = useRef<HTMLInputElement | null>(null);

  const addFile = ()=>{
    const imgFile = imgRef.current;
    const file=imgFile.files[0];
    const reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend=()=>{
      setImgFile(reader.result as SetStateAction<string>);
      setSelected(reader.result as SetStateAction<string>);
      setNumber(5);
    }
    console.log(imgFile);
  }

  function Menu({num} : {num : number}) {
    return (
      <>
        <input name='c' type='radio' id={`C${num}`} checked={number === num} onChange={function () { selectedImg(`images/C${num}.png`); setNumber(num)}}/>
        <label htmlFor={`C${num}`}>
          {number === num ? (<img src={`images/C${num}.png`} alt='image1' className='item2' />):(<img src={`images/C${num}.png`} alt='image1' className='item' />)} 
        </label>
      </>
    )
  }

  return (
    <div style={{visibility: isOpen ? 'visible' : 'hidden'}}>
      <div style={{ position:'absolute', width:'100%', height: '105%', zIndex:'1', backgroundColor:'white', opacity: '0.5'}}>
      </div>
      <div style={{ position:'absolute', width:'100%', height: '105%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex:'1'}}>
        <div style={{position:'absolute', zIndex: '2', width: '550px', height: '500px', backgroundColor: 'rgb(253, 246, 234)',borderRadius: '25px', border: '1px solid black'}}>
          <div style={{fontSize: '24px', textAlign: 'center'}}>이미지</div>
          <InsideModal>
            <ItemBox>
              <Menu num={1} />
              <Menu num={2} />
              <Menu num={3} />
              <Menu num={4} />
            </ItemBox>
          </InsideModal>
          <div style={{display:'flex', alignItems:'center', justifyContent: 'flex-end'}}>
            <ChoseBtn>
              <Button
                className={classes.customHoverFocus} type='button' onClick={Chose} style={{
                  width: '80px',
                  height: '32px',
                  borderRadius: '25px',
                  fontSize: '20px',
                  fontWeight: 'bolder'
                }}>선택</Button>
            </ChoseBtn>
            <div style={{margin: '0rem 4rem 0rem 5rem'}}>
              <input name='c' type='radio' id="C5" checked={number === 5} />
              <label htmlFor="C5">
                <label style={number!==5 ? {padding:'6px 25px', backgroundColor:'orange', borderRadius:'4px',color:'white',cursor:'pointer'}:{padding:'6px 25px', backgroundColor:'orange', borderRadius:'4px',color:'white',cursor:'pointer', border: '3px solid black'}} htmlFor="input-file">
                  업로드
                </label>
                <input type="file" id="input-file" accept="image/png, image/jpeg" style={{display:'none'}} onChange={addFile} ref={imgRef} /> 
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OpenModal