//Socket io stuff
import SocketIo from 'socket.io';
import gm from 'gm';
import uuid from 'node-uuid';
import busboy from 'connect-busboy';
import Util from 'util';
import Gravatar from 'nodejs-gravatar';
import Update from 'react-addons-update';

/*
 Import from Jason's Socket io implemenation, this needs to be refactored
 */

// Application state.
var state = {
  title: 'Unipart Digital Comm Cell',
  items: [],
  selection: false,
  users: [],
};

function values(object) {
  var items = [];
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      items.push(Update(object[key], {}));
    }
  }
  return items;
}

function parse_message(callback) {
  return function(message) {
    callback(JSON.parse(message));
  }
}

export default (app, server) =>{

  var io = new SocketIo(server, {path: '/api/chat'});

  // Accept file uploads.
  app.post('/upload', function(req, res) {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function(fieldname, file, filename) {

      var uploadWithExtension = function(extension) {
        return __dirname + '/static/uploads/' + uuid.v4() + extension;
      };

      var extension = path.extname(filename);
      var uploadPath = uploadWithExtension(extension);

      var fstream = fs.createWriteStream(uploadPath);
      file.pipe(fstream);
      fstream.on('close', function() {

        var completion = function(title, filename, cleanup) {

          // N.B. We explicitly specify the URL here (inc. 'index.html') to ensure this URL is different
          // to the top-level URL of the application itself. For some reason, when the two paths match,
          // Firefox will not load the contents of the iframes.
          // Doubtless there is 'correct' solution to this, but time is short.
          state.items.push({
            uuid: uuid.v4(),
            title: title,
            url: "/uploads/" + path.basename(filename),
            cleanup: cleanup
          });
          broadcastState();

        };

        if (extension == '.jpg' || extension == '.jpeg' || extension == '.png' || extension == '.gif') {

          var imagePath = uploadPath;
          gm(uploadPath).autoOrient().write(uploadPath, function() {
            completion(path.basename(filename, extension), uploadPath, function() {
              fs.unlink(imagePath, function(error) {
                if (error) {
                  console.log(error);
                }
              });
            });
            res.sendStatus(200);
          });

        } else if (extension == '.pdf') {

          var thumbnailPath = uploadWithExtension('.jpg');
          var command = Util.format(
            'gs -dBATCH -dNOPAUSE -sDEVICE=jpeg -r200 -sOutputFile=%s %s',
            thumbnailPath, uploadPath);
          exec(command, function(error) {

            if (error) {
              console.log("Encountered an error generating PDF preview.");
              console.log(error);
              res.sendStatus(500);
              return;
            }

            completion(path.basename(filename, extension), thumbnailPath, function() {
              fs.unlink(uploadPath, function(error) {
                if (error) {
                  console.log(error);
                }
              });
              fs.unlink(thumbnailPath, function(error) {
                if (error) {
                  console.log(error);
                }
              });
            });

            res.sendStatus(200);

          });

        } else {
          console.log(Util.format("Unsupported file with extension '%s'", extension));
          fs.unlink(uploadPath, function(error) {
            if (error) {
              console.log(error);
            }
          });
        }

      })
    })
  });

  var offerSocket = undefined;

  function broadcastState() {
    var clientState = Update(state, {
      users: {$set: values(state.users)}
    });
    io.emit('server-set-state', JSON.stringify(clientState));
  }


  io.on('connection', function(socket) {

    socket.uuid = uuid.v4(),
      state.users[socket.uuid] = {
        uuid: socket.uuid,
        name: 'Jason Morley',
        email: 'jason.morley@inseven.co.uk',
        avatar: Gravatar.imageUrl('jason.morley@inseven.co.uk', { "size": "128" })
      };
    broadcastState();
    //avatar: {$set: gravatar.imageUrl(user.email, { "size": "128" })},
    //avatar: {$set: gravatar.profile_url(user.email, { "size": "128" })},

    socket.on('disconnect', function() {

      delete state.users[socket.uuid];
      if (offerSocket == socket) {
        state.offer = undefined;
        state.answer = undefined;
      }
      broadcastState();

    }).on('client-set-user', parse_message(function(user) {

      state.users[socket].name = user.name;
      state.users[socket].email = user.email;
      broadcastState();

    })).on('client-add-item', parse_message(function(item) {

      item.uuid = uuid.v4();
      state.items.push(item);
      broadcastState();

    })).on('client-remove-item', parse_message(function(message) {

      var item = state.items[message.index];
      if (item.cleanup) {
        item.cleanup();
      }
      state.items.splice(message.index, 1);
      if (state.selection == item.uuid) {
        state.selection = false;
      }
      broadcastState();

    })).on('client-set-selection', parse_message(function(message) {

      state.selection = message.uuid;
      broadcastState();

    })).on('client-clear-selection', parse_message(function(message) {

      state.selection = false;
      broadcastState();

    })).on('client-call-add-ice-candidate', function(candidate) {

      socket.broadcast.emit('server-call-add-ice-candidate', candidate);

    }).on('client-call-set-offer', parse_message(function(offer) {

      state.offer = offer;
      offerSocket = socket;
      broadcastState();

    })).on('client-call-set-answer', parse_message(function(answer) {

      state.answer = answer;
      broadcastState();

    }));
  });
}
