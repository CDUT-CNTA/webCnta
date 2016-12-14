// 加 md5
fis.match('*.{js,css,png}', {
    useHash: true
});

// 启用 fis-spriter-csssprites 插件
fis.match('::package', {
    spriter: fis.plugin('csssprites')
});

//编译过滤
var ignores = fis.get('project.ignore');
ignores = ignores.concat([
    'test/**'
]);

// 对 CSS 进行图片合并
fis.match('*.css', {
    // 给匹配到的文件分配属性 `useSprite`
    useSprite: true
});

fis.match('*.js', {
    // fis-optimizer-uglify-js 插件进行压缩，已内置
    optimizer: fis.plugin('uglify-js')
});

fis.match('*.css', {
    // fis-optimizer-clean-css 插件进行压缩，已内置
    optimizer: fis.plugin('clean-css')
});

fis.match('*.png', {
    // fis-optimizer-png-compressor 插件进行压缩，已内置
    optimizer: fis.plugin('png-compressor')
});

//fis.media('debug').match('*.{js,css,png}', {
//    useHash: false,  //不需要hash
//    useSprite: false,  //不需要合并png
//    optimizer: null   //不需要压缩
//});

//使用文件合并功能
fis.match('::package', {
    postpackager: fis.plugin('loader')
});

//合并设置
fis.match('*.{js,css}', {
    packTo: '/static/aio.js'
});

fis.hook("relative"); //使用资源相对定位插件
fis.match("**", {
    relative: true
});

//fis.media('cdn').match('*', {
//    deploy: fis.plugin('http-push', {
//        receiver: 'http://cdn2.fungotv.com/receiver.php',
//        to: '/' // 注意这个是指的是测试机器的路径，而非本地机器
//    })
//});

//fis.match('*', {
//    deploy: fis.plugin('local-deliver', {
//        to: '../publish' //替代内置的server地址
//    })
//});
