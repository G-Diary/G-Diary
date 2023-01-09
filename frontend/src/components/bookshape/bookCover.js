import React from 'react';
import styled from 'styled-components';

const AllControl = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;`

const Left = styled.div`
  background-color: #535353;
  float: left;
  width: 55px;
  height: 814px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.38);`

const Right = styled.div`
  background-color: white;
  float: left;
  width: 675px;
  height: 814px;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.38);`

const Year = styled.div`
  border-bottom: solid 2px black;
  font-size: 30px;
  margin: 50px;`

function BookCover({children}) {
  return (
    <AllControl>
      <Left/>
      <Right>
        <Year>2023</Year>
        {children}
      </Right>
    </AllControl>
  );
}

export default BookCover;