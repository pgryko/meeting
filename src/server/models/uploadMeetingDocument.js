import gm from 'gm';
import uuid from 'node-uuid';
import Util from 'util';
import Gravatar from 'nodejs-gravatar';
import Update from 'react-addons-update';
import fs from 'fs';
import path from 'path';

export default function(req, res, broadcastState) {
  var fstream;
  req.pipe(req.busboy);
  req.busboy.on('file', function(fieldname, file, filename) {

    var uploadWithExtension = function(extension) {
      return path.resolve(__dirname,'..','build','client','uploads',uuid.v4() + extension);
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
                console.log("Error occured on gm");
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
}
