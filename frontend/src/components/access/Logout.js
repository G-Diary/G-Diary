import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import api from '../../apis/axios'

export default function LogoutBtn() {
  const navigate = useNavigate();
  const Swal = require('sweetalert2');
  
  function onClick(e) {
    Swal.fire({
      title: '로그아웃하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '네',
      cancelButtonText: '아니오'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '로그아웃 성공!',
          '',
          'success'
        )
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('refresh');
        sessionStorage.removeItem('nickname');
        sessionStorage.removeItem('id');
        console.log(api.defaults.headers.common)
        console.log(sessionStorage)
        navigate('/')
      }
    })
  }

  return (
    <Button type='button' onClick={onClick} style={{ fontWeight: 'bolder' }}>로그아웃</Button>
    
  )
}