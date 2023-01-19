import { Backdrop } from '@material-ui/core';
import { display } from '@mui/system';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import './Modal.css'
import DivBtn from './Button';
import { useStore } from '../../store/store';
import Titles from '../../pages/Title';

const CustomStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '550px',
    height: '500px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'rgb(253, 246, 234)',
    borderRadius:'25px'
    // backgroundImage: 'url(../images/Afs2.png)',
    // backgroundSize: 'cover',
    // backgroundColor: 'rgb(240, 219, 109)',
    // overlay: '#919191'
    // overlay: {background: '#919191'}
    // display: 'flex',

    // align-items: 'center',
    
  },
};

Modal.setAppElement('#root');

function Modals() {
  const [selected, setSelected] = useState('this')
  const [img, setImg] = useState('');

  const onClick = (img) => {
    setImg(img)
  }




  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function selectedImg(checked){
    setSelected(checked)
  }

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = 'black';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className='container'>
      {/* <h1 className='nameDiary'>John's Diary</h1> */}
      <div className='imgDisplay'><img className='imgClass' src={`images/${selected}.png`}/></div>
      <button className='openBtn' onClick={openModal}>  <Link to='/list' style={{
        color: 'white', 
        textDecorationLine: 'none', 
        fontWeight: 'bold'
      }}>START</Link></button>
    
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        // style={CustomStyles}
        style={CustomStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Profile</h2>
        {/* <button onClick={closeModal}>close</button> */}
        <div className='insideModal'>
          <div className='itemBox'>
            {/* <DivBtn order={'item'} image='images/C1.png' id='c1' />
            <DivBtn order={'item'} image='images/C2.png' id='c2'/>
            <DivBtn order={'item'} image='images/C3.png' id='c3'/>
            <DivBtn order={'item'} image='images/C4.png' id='c4'/> */}
            <>
              <input name='c' type='radio' id='C1' checked={selected==='C1'} onChange={()=>selectedImg('C1')}/>
              <label htmlFor='C1'>
                {selected === 'C1' ? (<img src='images/C1.png' alt='image1' className='item2' />):(<img src='images/C1.png' alt='image1' className='item' />)} 
              </label>
              <input name='c' type='radio' id='C2' checked={selected==='C2'} onChange={()=>selectedImg('C2')}/>
              <label htmlFor='C2'>
                {selected ==='C2' ? (<img src='images/C2.png' alt='image1' className='item2' />):(<img src='images/C2.png' alt='image1' className='item' />)} 
              </label>
              <input name='c' type='radio' id='C3' checked={selected==='C3'} onChange={()=>selectedImg('C3')}/>
              <label htmlFor='C3'>
                {selected ==='C3' ? (<img src='images/C3.png' alt='image1' className='item2' />):(<img src='images/C3.png' alt='image1' className='item' />)} 
              </label>
              <input name='c' type='radio' id='C4'  checked={selected==='C4'} onChange={()=>selectedImg('C4')}/>
              <label htmlFor='C4'>
                {selected ==='C4' ? (<img src='images/C4.png' alt='image1' className='item2' />):(<img src='images/C4.png' alt='image1' className='item' />)} 
              </label>
            </>
          </div>
        </div>

        <form>
          <button className='closeBtn' onClick={closeModal}>Select</button>
        </form>
      </Modal>
    </div>
  );
}

// ReactDOM.render(<App />, appElement);
export default Modals;