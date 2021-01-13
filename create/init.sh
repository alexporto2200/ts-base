#!/use/bin/env bash
############ Preparando ambiente
#install nvm 
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash;
nvm install 14.15.0


# add repos yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

# install yarn, sem instalar o node, node foi o nvm
apt update && sudo apt install --no-install-recommends yarn;

############# iniciando o projeto, instalando dependecias de dev, eslint 
yarn add -D typescript sucrase nodemon yarn add -D eslint @typescript-eslist/parser @typescript-eslint/eslint-plugin
yarn eslint --init
rm package-lock.json

#################
## gerar certificado para jwt 
openssl genrsa -out jwt-private.pem 4096
## gerar certificado publico
openssl rsa -in jwt-private.pem -pubout > jwt-public.pem


############# instalando bibliotecas para o projeto
#bibliotecas para uso em producao
yarn add express cors mongoose express-session redis connect-redis helmet uuid jsonwebtoken

#bibliotecas para uso dos tipos como dev
yarn add -D types/express @types/cors @types/mongoose @types/express-session @types/redis @types/connect-redis @types/helmet @types/uuid