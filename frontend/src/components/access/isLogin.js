export default function IsLogin() {
  return !!sessionStorage.getItem('token');
}
