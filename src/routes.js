export default [
    {
        path: '/',
        controller: 'chatCtrl',
        template: './views/chat/chat.html',
        lazyModule: './views/chat/chat.controller.js',
        labelKey: 'chatbot',
        iconClass: 'fa-message-bot',
    }, {
        path: '/components',
        controller: 'componentsCtrl',
        template: './views/components/components.html',
        lazyModule: './views/components/components.controller.js',
        labelKey: 'components',
        iconClass: 'fa-info-circle',
    }, {
        path: '/login',
        controller: 'loginCtrl',
        template: './views/login/login.html',
        lazyModule: './views/login/login.controller.js',
    }
];
