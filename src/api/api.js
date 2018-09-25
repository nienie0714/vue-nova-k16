let api = {
    url: { url: 'page/panel/leds.cgi2', method: 'get' },
    user: { url: 'users', method: 'get' }
};

for (var k in api) {
    let urlHost = window.htp.apihost;
    let url = api[k].url;

    if (process.env.NODE_ENV === 'development') {
        urlHost = '/proxy/';
    }
    api[k].url = urlHost + url;
}

export default api;
