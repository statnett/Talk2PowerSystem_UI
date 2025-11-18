export default [
    {
        path: '/',
        controller: 'chatCtrl',
        template: './views/chat/chat.html',
        lazyModule: './views/chat/chat.controller.js',
        labelKey: 'chatbot',
        iconClass: 'ri-robot-2-line ri-xl',
    }, {
        path: '/components',
        controller: 'componentsCtrl',
        template: './views/components/components.html',
        lazyModule: './views/components/components.controller.js',
        labelKey: 'components',
        iconClass: 'ri-apps-2-line ri-xl',
    }, {
        path: '/login',
        controller: 'loginCtrl',
        template: './views/login/login.html',
        lazyModule: './views/login/login.controller.js',
    }
];
