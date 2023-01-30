import React from 'react';
import styled from 'styled-components';
function IntroduceL(){
  return( 
    <IntroduceContainer>
      <LogoImg src="images/logo.png" alt="logo" />
      <Introducetitle>
      What about<span style={{color:'orange', fontWeight:'700'}}>&nbsp;G-Diary?</span>
      </Introducetitle>
      <div style={{'@media screen and (min-width: 1401px), screen and (min-height: 701px)' :{
        fontSize:'23px'
        , marginBottom:'8px'
      },
      '@media screen and (max-width: 1400px), screen and (max-height: 700px)' :{
        fontSize:'18.4px'
        , marginBottom:'6.4px'
      },fontWeight: 'bolder',textAlign:'center', fontFamily:'KyoboHand', color:'#777777'}}>About Team..?</div>
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
    position: absolute;  
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 90;
    @media screen and (min-width: 1401px), screen and (min-height: 701px) {
        width: 600px;
        height: 750px;
      }
      @media screen and (max-width: 1400px), screen and (max-height: 700px) {
        width: 480px;
        height: 600px;
      }
`

const Introducetitle =styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-family:KyoboHand;
    font-weight: bolder;
    font-style: italic;
    @media screen and (min-width: 1401px), screen and (min-height: 701px) {
        width: 500px;
        height: 70px;
        font-size: 35px;
      }
      @media screen and (max-width: 1400px), screen and (max-height: 700px) {
        width: 400px;
        height: 56px;
        font-size: 28px;
      }
`

const LogoImg = styled.img`
    width: 25%;
    border:none;
`

const IntroduceTeam = styled.div`
    width: 100%;
    height: 60%;
    // border: 3px solid black;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    @media screen and (min-width: 1401px), screen and (min-height: 701px) {
        margin-left: 60px;
      }
      @media screen and (max-width: 1400px), screen and (max-height: 700px) {
        margin-left: 48px;
      }
`

const Team = styled.div`
    width: 45%;
    display: flex;
    // justify-content: center;
    align-items:center;
    flex-direction: row;
    @media screen and (min-width: 1401px), screen and (min-height: 701px) {
        margin-top: 10px;
        margin-right: 8px;
        &>p{
            font-size: 1.2em;
            margin-left: 10px;
            font-family:KyoboHand;
            font-weight: bolder;
        }
      }
      @media screen and (max-width: 1400px), screen and (max-height: 700px) {
        margin-top: 8px;
        margin-right: 6.4px;
        &>p{
            font-size: 1.2em;
            margin-left: 8px;
            font-family:KyoboHand;
            font-weight: bolder;
        }
      }

`

const TeamImg = styled.img`
    border: 2px dashed gray;
    border-radius: 10%;
    object-fit: cover;
    @media screen and (min-width: 1401px), screen and (min-height: 701px) {
        width: 130px;
        height: 130px;
      }
      @media screen and (max-width: 1400px), screen and (max-height: 700px) {
        width: 104px;
        height: 104px;
      }
`

const TeamGit = styled.a`
    text-decoration:none;
    cursor: pointer;
    color: black;
    font-family:KyoboHand;
    font-weight: bolder;
    @media screen and (min-width: 1401px), screen and (min-height: 701px) {
        font-size: 20px;
        &:visited{
            text-decoration:none;
            color:black;
        }
        &:hover{
            color: orange;
        }
        margin-left: 10px;
      }
      @media screen and (max-width: 1400px), screen and (max-height: 700px) {
        font-size: 16px;
        &:visited{
            text-decoration:none;
            color:black;
        }
        &:hover{
            color: orange;
        }
        margin-left: 8px;
      }

`