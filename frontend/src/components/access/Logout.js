import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import api from '../../apis/axios'

export default function LogoutBtn() {
  const navigate = useNavigate();
  const Swal = require('sweetalert2');

  function onClick(e) {
    api.delete('/auth/').then(function (res) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '로그아웃 성공',
        showConfirmButton: false,
        timer: 2000
      })
      api.defaults.headers.common['Authorization'] = `Bearer ${null}`
      localStorage.removeItem('token');
      navigate('/')
    })
  }
  return (
    <Button type='button' onClick={onClick}>로그아웃</Button>
  )
}