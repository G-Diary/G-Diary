import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'

const NotFound = () => {
  const navigate = useNavigate();

  return(
    <ErrorPageContainer>
      <ErrorMsg>
        Not Found...
      </ErrorMsg>
      <ErrorPageBtn onClick={()=>{navigate(-1);}}>뒤로가기</ErrorPageBtn>
    </ErrorPageContainer>
  );
};

export default NotFound;

const ErrorPageContainer = styled.div`
height:100vh;
  display: flex;
  flex-direction: column;
  justify-content:center;
  margin: 0 auto;
  align-items: center;
`

const ErrorMsg = styled.div`
  font-size:8rem;
  color: red;
`
const ErrorPageBtn = styled.div`
  font-size: 3rem;
  color: black;
  cursor: pointer;
`

