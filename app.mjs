import Koa from 'koa'
import Router from 'koa-router'
import staticFiles from 'koa-static'
import ServerRenderer from 'vue-server-renderer'
import fs from 'fs'

const app = new Koa();
const router = new Router();
const bundle = fs.readFileSync('./dist/server.js', 'utf-8');
const renderer = ServerRenderer.createBundleRenderer(bundle, {
    template: fs.readFileSync('./dist/index.html', 'utf-8')
})
router.get('/',async(ctx, next) => {
    await renderer.renderToString((err, html) => {
        if (err) {
            ctx.status = 500;
            ctx.body = '服务器内部错误';
        } else {
            ctx.type = 'html';
            ctx.status = 200;
            ctx.body = html;
        }
    });
})
/** 中间件调用的地方 */
app.use(router.routes()).use(router.allowedMethods());
app.use(staticFiles('./dist/'))
app.listen(4000)
app.on('error',(err,ctx)=>{
    console.log(err)
})