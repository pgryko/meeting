# meeting
A meeting board with WebRTC integration

#Installation instructions

Install nodejs v6 from
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -

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

#Postgres Ubuntu installation instructions

- Install postgres
sudo apt-get install postgresql postgresql-contrib

- Change to user postgress
sudo su - postgres

- login to postgres
psql

- Create commcell role
CREATE ROLE commcell WITH LOGIN PASSWORD 'development';

- Create DB
CREATE DATABASE commcell;

- Grant privliages
grant all privileges on database commcell to commcell;

- Exit postgress
\q
exit

- Run sequelize migrations
npm run sequelize db:migrate
