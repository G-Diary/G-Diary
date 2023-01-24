export default function IsLogin() {
  return !!localStorage.getItem('token');
}