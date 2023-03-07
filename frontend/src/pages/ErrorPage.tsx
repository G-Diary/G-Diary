import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return <div>Not Found...
    <button onClick={()=>{navigate(-1);}}>뒤로가기</button>
  </div>;
};

export default NotFound;