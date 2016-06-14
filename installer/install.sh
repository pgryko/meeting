#!/bin/bash

set -eu
## pseudo-installer for CommCell - to be converted into Ansible

install-dependencies () {
  curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
  sudo apt-get install -y make g++ mongodb-server postgresql postgresql-contrib
}

install-commcell () {
  mkdir ~/repos
  cd ~/repos
  git clone https://github.com/mk270/meeting.git
}

setup-postgres-user () {
  TMP=$(tempfile)
  echo "create user commcell password 'development';" > $TMP
  sudo chown postgres $TMP
  sudo -u postgres psql --file=$TMP
  sudo rm -f -- $TMP
}

setup-postgres-db () {
  sudo -u postgres createdb -O commcell commcell
}

install-dependencies
install-commcell
#setup-postgres-user
#setup-postgres-db

cd ~/repos/meeting

