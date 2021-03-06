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


export default class Engine {

  constructor() {
    this.stateObservers = [];
    this.state = {};
    this.roomName = "";
  }

  addStateObserver(observer) {
    this.stateObservers.push(observer);
    observer(this.state);
  }

  removeStateObserver(observer) {
    delete this.stateObservers[this.stateObservers.indexOf(observer)];
  }

  setState(state) {
    console.log("State contents are");
    console.log(state);
    console.log("And type is");
    console.log(typeof state);
    this.state = state;
    for (var i in this.stateObservers) {
      this.stateObservers[i](state);
    }
  }

  connect(roomName) {
    var self = this;
    //Save room name in class constructor
    this.roomName = roomName;
    self._socket = io('', {path: '/api/chat'});


    self._socket.on('server-set-state', function (state) {
      self.setState(state);
    });
    self._socket.on('server-request-room', function () {
      self._sendMessage('client-join-room', roomName);
    })

  }

  disconnect()
  {
    this._socket.disconnect();
  }

  _sendMessage(message, parameters, room = "") {
    if (room != "") {
      this._socket.to(room).emit(message, parameters);
    }
    else {
      this._socket.emit(message, parameters);
    }
  }

  setUser(user) {
    this._sendMessage('client-set-user', user);
  }

  addItem(item) {
    this._sendMessage('client-add-item', {room: this.roomName ,item: item});
  }

  removeItem(index) {
    this._sendMessage('client-remove-item', {room: this.roomName, index: index});
  }

  setSelection(uuid) {
    this._sendMessage('client-set-selection', {room: this.roomName, uuid: uuid});
  }

  clearSelection() {
    this._sendMessage('client-clear-selection', {room: this.roomName});
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
    //Add room name to request header
    xhr.setRequestHeader("room",this.roomName);
    xhr.send(formData);
  }

}
