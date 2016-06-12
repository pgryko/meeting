var update = require('react-addons-update');

function values(object) {
  var items = [];
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      items.push(update(object[key], {}));
    }
  }
  return items;
}

module.exports = values;
