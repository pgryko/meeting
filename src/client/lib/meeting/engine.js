/*
 * Copyright (C) 2015-2016 InSeven Limited.
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

import io from 'socket.io-client';

import parse_message from './parse-message';

export default class Engine {

  constructor() {
    this.stateObservers = [];
    this.state = {};
  }

  addStateObserver(observer) {
    this.stateObservers.push(observer);
    observer(this.state);
  }

  removeStateObserver(observer) {
    delete this.stateObservers[this.stateObservers.indexOf(observer)];
  }

  setState(state) {
    this.state = state;
    for (var i in this.stateObservers) {
      this.stateObservers[i](state);
    }
  }

  connect() {
    var self = this;
    self._socket = io('', {path: '/api/chat'});


    self._socket.on('server-set-state', parse_message(function (state) {
      self.setState(state);
    }));
    self._socket.on('server-request-room', function () {
      console.log("Sever requested user details");
      self._sendMessage('client-request-room', JSON.stringify({room: 'thelab'}))
    })
  }

  _sendMessage(message, parameters, room = "") {
    if (room != "") {
      this._socket.to(room).emit(message, JSON.stringify(parameters));
    }
    else {
      this._socket.emit(message, JSON.stringify(parameters));
    }
  }

  setUser(user) {
    this._sendMessage('client-set-user', user);
  }

  addItem(item) {
    this._sendMessage('client-add-item', item);
  }

  removeItem(index) {
    this._sendMessage('client-remove-item', {index: index});
  }

  setSelection(uuid) {
    this._sendMessage('client-set-selection', {uuid: uuid});
  }

  clearSelection() {
    this._sendMessage('client-clear-selection', {});
  }


  uploadFiles(files, callback) {

    var fileArray = [];
    for (var i = 0, f; f = files[i]; i++) {
      fileArray.unshift(f);
    }

    var continuation = () => {
      var file = fileArray.pop();
      if (file) {
        this.uploadFile(file, continuation);
      } else {
        if (callback) {
          callback();
        }
      }
    };
    continuation();

  }

  uploadFile(file, callback) {
    var xhr = new XMLHttpRequest();
    var formData = new FormData();
    formData.append("file", file);
    xhr.addEventListener("load", () => {
      if (callback) {
        callback(xhr);
      }
    });
    xhr.open("POST", "/upload");
    xhr.send(formData);
  }

}
