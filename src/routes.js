export default [
    {
        path: '/',
        controller: 'chatCtrl',
        template: './views/chat/chat.html',
        lazyModule: './views/chat/chat.controller.js',
    }, {
        path: '/login',
        controller: 'loginCtrl',
        template: './views/login/login.html',
        lazyModule: './views/login/login.controller.js',
    }
];
