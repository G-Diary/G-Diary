import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import IsLogin from '../access/IsLogin'

const BookMark = styled.div`
    width: 70px;
    height: 700px;
    z-index:1;
`
const StyledNavLink=styled(NavLink)`
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
    opacity:0.9;
    background-color: rgba(0, 0, 0, 0.8);
    &:link {
      transition : 0.5s;
      text-decoration: none;
    }
    &:hover{
      color: gray;
    }
    &.active {
      background-color: #F0DB6D;
      color: black;
      font-weight: 700;
    }
`

function Bookmark() {
  return (
    <BookMark>
      <StyledNavLink to={IsLogin() ? '/main' : '/'}>홈</StyledNavLink>
      <StyledNavLink to='/list'>목록</StyledNavLink>
      <StyledNavLink to='/about'>소개</StyledNavLink>
    </BookMark>)
}

export default Bookmark;