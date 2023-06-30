import React from 'react';
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import IsLogin from '../access/IsLogin';
import { useStore } from '../../store/store';

function Bookmark() {
  // const location = useLocation();
  const { setChoiceImg, setGetGrimList } = useStore();
  // let loca = location.pathname;

  // useEffect(() => {
  //   if (loca === '/signin' || loca === '/signup' || (IsLogin() && loca === '/')) {
  //     document.getElementById('home').style.backgroundColor = '#F0DB6D';
  //     document.getElementById('home').style.color = 'black';
  //     document.getElementById('home').style.fontWeight = '700';
  //   } else if (loca === '/write') {
  //     document.getElementById('write').style.backgroundColor = '#F0DB6D';
  //     document.getElementById('write').style.color = 'black';
  //     document.getElementById('write').style.fontWeight = '700';
  //   }
  // }, []);

  // function Valid() {
  //   if (loca === '/' || loca === '/signin' || loca === '/signup' || (!IsLogin() && loca === '/about') || (IsLogin() && loca === '/main')) {
  //     return 'none';
  //   } else {
  //     return '';
  //   }
  // }

  function onClick() {
    setChoiceImg([]);
    setGetGrimList([]);
  }

  return (
    <BookMark>
      <StyledNavLink to={IsLogin() ? '/main' : '/'} onClick={onClick}>
        <div id='home' style={{ borderRadius: '0 5px 5px 0' }}>
          홈
        </div>
      </StyledNavLink>
      <StyledNavLink id='write' to='/list' onClick={onClick}>
        {/* style={{ pointerEvents: Valid() }}  */}
        일기 쓰기
      </StyledNavLink>
      <StyledNavLink to='/about' onClick={onClick}>
        {/* style={{ pointerEvents: loca === '/main' ? 'none' : '' }} */}
        소개
      </StyledNavLink>
    </BookMark>
  );
}

export default Bookmark;

const BookMark = styled.div`
  width: 70px;
  height: 700px;
  z-index: 0;
`;
const StyledNavLink = styled(NavLink)`
  display: block;
  width: 65px;
  height: 43px;
  text-decoration: none;
  margin-bottom: 10px;
  font-size: 18px;
  border-radius: 0 5px 5px 0;
  text-align: center;
  line-height: 43px;
  color: white;
  border: 0.8px groove gray;
  border-left: none;
  font-weight: 400;
  opacity: 0.9;
  background-color: rgba(0, 0, 0, 0.8);
  &:link {
    transition: 0.5s;
    text-decoration: none;
  }
  &:hover {
    color: gray;
  }
  &.active {
    background-color: #f0db6d;
    color: black;
    font-weight: 700;
  }
`;