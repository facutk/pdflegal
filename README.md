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
git$ sudo apt install git redis nodejs npm
git$ git clone https://github.com/facutk/pdflegal.git && cd pdflegal
git$ make configure
```
