import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import IsLogin from '../access/IsLogin'

const BookMark = styled.div`
    width: 70px;
    height: 700px;
    z-index:80;
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
    color: black;
    border: 0.8px groove gray;
    border-left: none;
    font-weight: 400;
    font-family:Comic Sans MS;
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
`
function Bookmark(){
  return(
    <BookMark>
      <StyledNavLink to={IsLogin() ? '/main' : '/'} style={{background:'#F29F05'}}>Home</StyledNavLink> 
      <StyledNavLink to='/write' state={{date:new Date()}} style={{background:'#F2C879'}}>Write</StyledNavLink> 
      <StyledNavLink to='/list' style={{background:'rgb(242, 181, 107)'}}>List</StyledNavLink> 
      <StyledNavLink to='/about' style={{ background: '#F25C05' }}>About</StyledNavLink>
    </BookMark>)
}

export default Bookmark;