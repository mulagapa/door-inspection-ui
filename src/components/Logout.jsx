import Cookies from 'universal-cookie';


export const Logout = () => {
    const cookies = new Cookies();
    cookies.remove('jwt_token')
    window.location.reload();
}