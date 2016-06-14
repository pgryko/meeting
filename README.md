# meeting
A meeting board with WebRTC integration

#Installation instructions

Ubuntu:

Install nodejs v6 from
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -

Install
sudo apt-get install -y python nodejs make g++

Install Mongodb

npm install

sudo npm install -g nodemon

For development

npm run start
- This will build both the client and the server code. It will the start a build watcher.

For Production:
Environmental parameters need to be set


//Environmental params
process.env.SESSION_SECRET = 'Your Session Secret goes here';
process.env.MONGOHQ_URL = 'mongodb://localhost/production'
process.env.NODE_ENV = 'production'

process.env.GOOGLE_CLIENTID = 'example',
process.env.GOOGLE_SECRET = 'Example',
process.env.GOOGLE_CALLBACK = '/auth/google/callback'

Build project and run server
npm run build:prod
node build/server.bundle.js
