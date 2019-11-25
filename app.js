const Koa = require('koa')
const staticFiles = require('koa-static')
const ServerRenderer = require('vue-server-renderer')
const fs = require('fs')
const serverBundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
const app = new Koa();
const renderer = ServerRenderer.createBundleRenderer(serverBundle, {
    template: fs.readFileSync('./dist/template.html', 'utf-8'),
    clientManifest
})
/** 中间件调用的地方 */
app.use(staticFiles('./dist/'));
app.use(async ctx=>{
    let result = await renderer.renderToString({
        url: ctx.url
    })
    if(result){
        ctx.type = 'html';
        ctx.status = 200;
        ctx.body = result;
    }
})
app.listen(4000, () => {
    console.log('服务器已经启动 端口为 4000')
})
app.on('error', (err, ctx) => {
    console.log('全局捕获', err)
})