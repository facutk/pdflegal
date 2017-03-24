# pdflegal

## Server setup
```
local$ ssh root@server
# adduser git
# usermod -aG sudo git
# exit
local$ ssh-copy-id git@server
local$ ssh git@server
git$ sudo apt update && sudo apt upgrade
git$ sudo apt install -y git nginx redis
git$ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
git$ sudo apt-get install -y nodejs
git$ sudo npm install -g pm2
git$ git clone https://github.com/facutk/pdflegal.git && cd pdflegal
git$ make configure
```

## Deployment

Current deployment is handled via codeship.
![codeship status](https://codeship.com/projects/4f8c0be0-f2d5-0134-7372-3eafc7b1bd2f/status?branch=master)
