# meeting
A meeting board with WebRTC integration

#Installation instructions

Install nodejs v6 from
https://deb.nodesource.com/setup_6.x

npm install

npm run start
- This will build both the client and the server code. It will the start a build watcher.


# Architecture

## Database
Sequelize is used as on ORM for Database access. The implementation is based on code from
https://github.com/choonkending/react-webpack-node

Setting up Postgres

Install Postgres as your database:

# Update brew formulae
brew update
# Install Postgres
brew install postgres
Run your Postgres server

postgres -D /usr/local/var/postgres
Setup your postgres database

createuser root
createdb react_webpack_node_development # or test/production
npm run sequelize db:migrate
