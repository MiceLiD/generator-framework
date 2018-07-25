## development mode
```
npm run dev
```
webpack-dev-server & node 端口配置在config/index.js

## production mode
```
npm run build
sh ./start.sh
```

## production mode && nginx config
生产模式监听unix的sockets,需要配置nginx
```
upstream <%= appname %>_prod {
    server unix:{your workspace}/<%= appname %>/shared/sockets/node.sock;
}
server {
    port xxxx;
    server_name xxx;

    location /<%= appPrefix %> {
        proxy_pass http://<%= appname%>_prod;
    }
    location /static/<%= appPrefix %> {
        alias {your workspace}/<%= appname %>/static/<%= appPrefix %>/;
    }
}
```