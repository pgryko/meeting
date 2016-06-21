# Meeting

A meeting board with Socket.IO integration.

The project is based on the following template:

https://github.com/choonkending/react-webpack-node

# Installation instructions

## Ubuntu

1. Install [Node.JS][nodejs] v6 from:

	```bash
	curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
	```

2. Install package dependencies:

	```bash
	sudo apt-get install -y python nodejs make g++
	```

3. Install the project dependencies:

	```bash
	npm install
	```

4. Install Mongodb:

	```bash
	sudo npm install -g nodemon parallelshell cross-env
	```

## OS X

The OS X developer setup makes use of [Homebrew](https://brew.sh), so please install that if you have not done so already.

1. Install [Node.js][nodejs] and friends:

	```bash
   brew install node
   npm install -g nodemon parallelshell cross-env
	```
	
2. Install and configure MongoDB; run the following command from the root of the project:

   ```bash
   brew install mongodb --with-openssl  # install
   mkdir -p db  # create data directory
   mongod --dbpath db  # run mongodb
   ```

   You can find more detailed instructions [here](https://docs.mongodb.com/master/tutorial/install-mongodb-on-os-x/?_ga=1.153956344.1906756264.1465927705).
   
   N.B. This does not configure `mongod` to start on system start, so you will need to run it each time you wish to run the project.
   
3. Install the local package dependencies:

	```bash
	npm install
	```

[nodejs]: https://nodejs.org/

# Development

1. Follow the installation instructions detailed above for your platform.

2. Start the server:

   ```bash
   npm run start
   ```

   _This will build both the client and the server code. It will the start a build watcher._

N.B. You may encounter errors such as:

```
Error: Cannot find module 'unicode/category/So'
```

This is seemingly an issue with unicode data being unavailable and preventing installation of the unicode package. This is discussed in greater detail on the [unicode package page](https://www.npmjs.com/package/unicode#install). You can also find a discussion on [Stack Overflow](https://github.com/dodo/node-slug/issues/58).

In the end, it proved necessary to follow the instructions which advised:

```bash
cd node_modules/slug
npm install unicode
```

Needless to say this is incredibly bad practice and cannot be relied upon for deployments. Hopefully it's only an OS X problem.


## Production

Environmental parameters need to be set

```bash
//Environmental params
process.env.SESSION_SECRET = 'Your Session Secret goes here';
process.env.MONGOHQ_URL = 'mongodb://localhost/production'
process.env.NODE_ENV = 'production'
process.env.PORT = 8090

process.env.GOOGLE_CLIENTID = 'example',
process.env.GOOGLE_SECRET = 'Example',
process.env.GOOGLE_CALLBACK = '/auth/google/callback'
```

Build project and run server:

```bash
npm run build:prod
node build/server.bundle.js
```
