let api = {
    postLogin: { url: 'login', method: 'post' },
    // 用户
    getUsers: { url: 'users' },
    deleteUser: { url: 'users/:id', method: 'delete' },
    addUser: { url: 'users', method: 'post' },
    editUser: { url: 'users/:id', method: 'put' },
    // 角色
    getRoles: { url: 'roles' },
    deleteRole: { url: 'roles/:id', method: 'delete' },
    addRole: { url: 'roles', method: 'post' },
    editRole: { url: 'roles/:id', method: 'put' },
    //产品
    getProduct: { url: 'products' },
    postProduct: { url: 'products', method: 'post' },
    deleteProduct: { url: 'products/:id', method: 'delete' },
    editProduct: { url: 'products/:id', method: 'put' }
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
