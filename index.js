const axios = require('axios');
const pkgInfo = require('./package.json');
const os = require('os');
const qs = require('qs');
const EmptyError = require('./errors/EmptyError');

const API = {
  sendMessage: {
    method: 'POST',
    url: '/messages',
    optionalArgs: ['from', 'mark_addressed', 'media_url', 'tags', 'status_callback'],
  }
}

class Avochato {
  constructor(options = {}) {
    const {auth_id, auth_secret, debug, baseUrl, timeout} = options;

    if (!auth_id) throw new EmptyError('auth_id');
    if (!auth_secret) throw new EmptyError('auth_secret');

    this.auth_id = auth_id;
    this.auth_secret = auth_secret;
    this.debug = !!debug;

    this.axios = axios.create({
      baseURL: baseUrl || 'https://www.avochato.com/v1/',
      timeout: timeout || 10000,
    });
    if (this.debug) console.log('baseURL:', this.axios.defaults.baseURL);

    this.userAgent = `avochato-node/${pkgInfo.version} (${os.version()}) NodeJS/${process.version} Axios/${axios.VERSION}`;
    this.axios.defaults.headers.common['User-Agent'] = this.userAgent;
    if (this.debug) console.log('User-Agent:', this.userAgent);
  }

  static connectWith(options = {}) {
    return new Avochato(options);
  }

  sendMessage(args = {}) {
    const {method, url, optionalArgs} = API.sendMessage;
    const {phone, message, media_url} = args;

    if (!phone) throw new EmptyError('phone');
    if (!message && !media_url) throw new EmptyError('message', ['media_url']);

    const params = Object.assign(this._state, {
      phone,
      message,
    });

    optionalArgs.forEach((k) => {
      if (k in args) params[k] = args[k];
    });

    if (this.debug) console.log('Generated Request:', {method, url, params});
    return this.axios({
      method,
      url,
      params,
      validateStatus: (s) => s < 500,
    });
  }

  /**
    *  Private methods
    */
  get _state() {
    return {
      auth_id: this.auth_id,
      auth_secret: this.auth_secret,
    };
  }
}
module.exports = Avochato;
