import React from 'react';
import styled from 'styled-components';
function IntroduceL(){
  return( 
    <IntroduceContainer>
      <LogoImgConatiner>
        <LogoImg src="images/logo.png" alt="logo" />
      </LogoImgConatiner>
      <Introducetitle>
       What about<span style={{color:'orange', fontWeight:'700'}}>&nbsp;G-Diary?</span>
      </Introducetitle>
      <IntroduceDes>About Team..?</IntroduceDes>
      <IntroduceTeam>
        <Team><TeamImg src="images/park.JPG" alt="team" /><TeamGit href="https://github.com/gmlrude">HeeKyeong</TeamGit></Team>
        <Team><TeamImg src="images/jang.JPG" alt="team" /><TeamGit href="https://github.com/aristo0922">AhRyeong</TeamGit></Team>
        <Team><TeamImg src="images/yoon.JPG" alt="team" /><TeamGit href="https://github.com/yangwonjoon">WonJoon</TeamGit></Team>
        <Team><TeamImg src="images/lim.JPG" alt="team" /><TeamGit href='https://github.com/gs0428'>GwangSoo</TeamGit></Team>
        <Team><TeamImg src="images/yang.JPG" alt="team" /><TeamGit href='https://github.com/yunyoungse2222'>YoungSe</TeamGit></Team>
        <Team><TeamImg src="images/lee.JPG" alt="team" /><TeamGit href='https://github.com/alswlfl29'>MinJi</TeamGit></Team>
      </IntroduceTeam>
    </IntroduceContainer>)
}
export default IntroduceL;

export const IntroduceContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 90;
`

const Introducetitle =styled.div`
    width: 100%;
    font-size: 2.5rem;
    font-family:KyoboHand;
    font-weight: bolder;
    font-style: italic;
    text-align: center;
    @media screen and (max-width: 1400px), screen (max-height: 500px){
        font-size: 2rem;

    }
    @media screen and (max-width: 1200px), screen (max-height: 400px){
        font-size: 1.5rem;
    }
`

const IntroduceDes = styled.div`
    width: 100%;
    color: #777;
    font-size: 1.7rem;
    font-weight: 700;
    text-align: center;
    @media screen and (max-width: 1400px), screen (max-height: 500px){
        font-size: 1.7rem;
    }
    @media screen and (max-width: 1200px), screen (max-height: 400px){
        font-size: 1.2rem;
    }
`

const LogoImgConatiner = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 5px;
    box-sizing: border-box;
`

const LogoImg = styled.img`
    width: 10rem;
    border:none;
    @media screen and (max-width: 1400px), screen (max-height: 500px){
        width: 8rem;
    }
    @media screen and (max-width: 1200px), screen (max-height: 400px){
        width: 6rem;
    }
`

const IntroduceTeam = styled.div`
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    box-sizing: border-box;
    padding-left: 2rem;
`

const Team = styled.div`
    width: 50%;
    display: flex;
    align-items:center;
    flex-direction: row;
`

const TeamImg = styled.img`
    width: 130px;
    height: 130px;
    border: 2px dashed gray;
    border-radius: 10%;
    object-fit: cover;
    @media screen and (max-width: 1400px), screen (max-height: 500px){
        width: 115px;
        height: 115px;
    }
    @media screen and (max-width: 1200px), screen (max-height: 400px){
        width: 100px;
        height: 100px;
    }
`

const TeamGit = styled.a`
    text-decoration:none;
    cursor: pointer;
    color: black;
    font-family:KyoboHand;
    font-weight: bolder;
    font-size: 20px;
    &:visited{
        text-decoration:none;
        color:black;
    }
    &:hover{
        color: orange;
    }
    margin-left: 10px;
    @media screen and (max-width: 1400px), screen (max-height: 500px){
        font-size: 20px;
    }
    @media screen and (max-width: 1200px), screen (max-height: 400px){
        font-size: 13px;
    }
`