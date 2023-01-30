import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import IsLogin from '../access/IsLogin'

const BookMark = styled.div`
    z-index:80;
    @media screen and (min-width: 1401px), screen and (min-height: 701px) {
      width: 70px;
      height: 700px;
    }
    @media screen and (max-width: 1400px), screen and (max-height: 700px) {
      width: 56px;
      height: 560px;
    }
`
const StyledNavLink=styled(NavLink)`
    display: block;
    text-decoration: none;
    border-radius: 0 5px 5px 0;
    text-align: center;
    color: black;
    border: 0.8px groove gray;
    border-left: none;
    font-weight: 400;
    opacity:0.9;
    &:link {
      transition : 0.5s;
      text-decoration: none;
    }
    &:hover{
      color: gray;
    }
    &.active {
      color: #d5260d;
      font-weight: 700;
    }
    @media screen and (min-width: 1401px), screen and (min-height: 701px) {
      width: 65px;
      height: 43px;
      margin-bottom: 10px;
      font-size: 18px;
      line-height: 43px;
    }
    @media screen and (max-width: 1400px), screen and (max-height: 700px) {
      width: 52px;
      height: 34.4px;
      margin-bottom: 8px;
      font-size: 14.4px;
      line-height: 34.4px;
    }
`
function Bookmark(){
  return(
    <BookMark>
      <StyledNavLink to={IsLogin() ? '/main' : '/'} style={{background:'#80FF00'}}>홈</StyledNavLink> 
      <StyledNavLink to={'/list'} style={{background:'#FFE600'}}>목록</StyledNavLink> 
      <StyledNavLink to={'/write'} state={{date:new Date()}} style={{background:'#0085FF'}}>글 쓰기</StyledNavLink> 
      <StyledNavLink to='/about' style={{ background: 'rgba(217, 132, 57)' }}>소개</StyledNavLink>
    </BookMark>)
}

export default Bookmark;