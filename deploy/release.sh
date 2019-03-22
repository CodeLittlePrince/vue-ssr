#!/bin/bash

# 如果异常错误（比如内存不足）npd
set -o errexit

echo "start"

install_nvm(){
  if [ -z $NVM_DIR ]
  then
    export NVM_DIR="$HOME/.nvm"
  else
    export NVM_DIR
  fi

  echo $NVM_DIR
  echo "$(ls -a $NVM_DIR)"
  if [ -s "$NVM_DIR/nvm.sh" ]
  then
    . "$NVM_DIR/nvm.sh"
  else
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
    . "$NVM_DIR/nvm.sh"
  fi
}

# 防止构建失败，导致package.json被改写，却没被还原
git checkout .
install_nvm
echo "install_nvm completed"
nvm install 8.11.1
nvm use 8.11.1
npm config set strict-ssl false
npm config set registry "https://registry.npm.taobao.org"
node ./deploy/ignore.npm/ignore.js
npm install
npm run prod
node ./deploy/ignore.npm/recover.js
echo "release completed"
