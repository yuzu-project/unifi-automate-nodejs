class AuthenticationToken {
  constructor(url, authenticationCookies) {
    this.url = url;
    this.cookies = authenticationCookies;
  }

  get cookies() {
    return this.cookies;
  }

  get url() {
    return this.url;
  }
}

export default AuthenticationToken;
