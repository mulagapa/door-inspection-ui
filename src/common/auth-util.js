import Cookies from 'universal-cookie'

const parseJwt = (token) => {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

const auth = {
  isAuthenticated() {
    if (typeof window == "undefined")
      return false
    const cookie = new Cookies();
    if (cookie.get('jwt_token'))
      return JSON.parse(cookie.get('jwt_token'))
    else
      return false
  },
  authenticate(jwt, cb) {
    const cookie = new Cookies();
    if (typeof window !== "undefined")
      cookie.set('jwt_token', JSON.stringify(jwt))
    cb()
  },
  getEmail() {
    const cookies = new Cookies();
    if (typeof window == "undefined") {
      console.log("Window undefined for the getEmail")
      return false
    }

    if (cookies.get('jwt_token'))
      return parseJwt(cookies.get('jwt_token')).email

    console.log("cookies get undefined for the getEmail", cookies)
    return false
  }
}

export { auth, parseJwt }