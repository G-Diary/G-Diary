export default function isLogin() {
  return !!localStorage.getItem('token');
}