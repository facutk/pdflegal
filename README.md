# pdflegal

## Backend Server Setup

```
local$ ssh root@server
root@ubuntu:~# adduser git
root@ubuntu:~# usermod -aG sudo git
root@ubuntu:~# exit
root@ubuntu:~# su - git

git@ubuntu:~$ sudo apt update && sudo apt upgrade
git@ubuntu:~$ sudo apt install -y git nginx redis systemd
git@ubuntu:~$ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
git@ubuntu:~$ sudo apt-get install -y nodejs
git@ubuntu:~$ sudo npm install -g pm2
git@ubuntu:~$ git clone https://github.com/facutk/pdflegal.git && cd pdflegal/server
git@ubuntu:~/pdflegal/server$ pm2 start --name pdflegal server.js
  [PM2] Starting /home/git/pdflegal/server/server.js in fork_mode (1 instance)
  [PM2] Done.
  ┌──────────┬──────┬────────┬───┬──────┬───────────┐
  │ Name     │ mode │ status │ ↺ │ cpu  │ memory    │
  ├──────────┼──────┼────────┼───┼──────┼───────────┤
  │ pdflegal │ fork │ online │ 0 │ 144% │ 14.6 MB   │
  └──────────┴──────┴────────┴───┴──────┴───────────┘
  Use `pm2 show <id|name>` to get more details about an app

git@ubuntu:~/pdflegal/server$ pm2 startup upstart

  [PM2] Init System found: systemd
  [PM2] You have to run this command as root. Execute the following command:
  sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup upstart -u git --hp /home/git

git@ubuntu:~/pdflegal/server$ sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u git --hp /home/git
  [sudo] password for git:
  [PM2] Init System found: upstart
  ....

git@ubuntu:~/pdflegal/server$ pm2 save
  [PM2] Saving current process list...
  [PM2] Successfully saved in /home/git/.pm2/dump.pm2

git@ubuntu:~/pdflegal/server$ curl localhost
  {"server":"pdflegal"}

```

Skip using ssh password
```
local$ ssh-copy-id git@server
local$ ssh git@server
```

### Configure nginx

#### Test
After installing nginx, trying this command, which should return the following:

```
git@ubuntu:~$ curl localhost

<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

#### Configure
```
git@ubuntu:~$ sudo vim /etc/nginx/sites-available/default
```

Delete everything, and replace with the following.

```
upstream pdflegal_upstream {
    server 127.0.0.1:3001;
    keepalive 64;
}

server {
    listen 80;
    server_name pdflegal_server;
    
    location / {
    	proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    	proxy_set_header Host $http_host;
    	proxy_set_header X-NginX-Proxy true;
    	proxy_http_version 1.1;
    	proxy_set_header Upgrade $http_upgrade;
    	proxy_set_header Connection "upgrade";
    	proxy_max_temp_file_size 0;
    	proxy_pass http://pdflegal_upstream/;
    	proxy_redirect off;
    	proxy_read_timeout 240s;
    }
}
```

Run
```
git@ubuntu:~$ sudo service nginx restart
 * Restarting nginx nginx                                                [ OK ]
```

Test it
```
git@ubuntu:~$ curl localhost
<html>
<head><title>502 Bad Gateway</title></head>
<body bgcolor="white">
<center><h1>502 Bad Gateway</h1></center>
<hr><center>nginx/1.4.6 (Ubuntu)</center>
</body>
</html>
```

## Frontend Server Setup

- Frontend is hosted at github, as a github page.
- Deploy server must checkout via git+ssh (not https).
- Copy ssh public identity.
- Save ssh public identity on Github repo > Settings > Deploy Keys.

### Sample push
```
git init
git add .
git commit -m "commit message"
git remote add origin GHPAGES_REPO
git push -u --force origin master
```

## Deployment

Current deployment is handled via codeship.
![codeship status](https://codeship.com/projects/4f8c0be0-f2d5-0134-7372-3eafc7b1bd2f/status?branch=master)

### Codeship config

- Add new project > Link to github project repo.
- Setting > Deployment > Custom Script.

```
ssh git@api.pdflegal.com.ar 'bash pdflegal/bin/update-server.sh'
npm install
npm run webpack-production
npm run push-to-ghpages
```


# Diagrams

## Architecture

```
GITHUB -----> CODESHIP -----> CDN
                      \-----> WORKERS

REACT - FETCH

PM2 - EXPRESS SERVER - REDIS

UNIX JOBS

```


## Processing flow
```
Client          Server        Queue          Worker
  |               |             |              |
  X-------------->|             |              |          Add file
  |               |             |              |
  |               X------------>|              |          Queue job
  |               |             |              |
  |               |             X------------->|          Dispatch job

```