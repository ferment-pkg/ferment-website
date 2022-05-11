#!/bin/sh
set -e
fermentPATH=$(which ferment)
isXcodeCLIInstalled=$(xcode-select -p)
if [ "$fermentPATH" != "" ]
then
  echo "ferment is already installed"
  exit 1
fi
read -p "This Script Uses sudo Do You Want to Continue? (y/n)" -s -n 1
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
  break
else
  echo "Exiting"
  exit 1
fi
echo "Installing ferment"
if [ "$isXcodeCLIInstalled" = "" ]
then
  echo "xcode comamnd line is not installed, would you like to install git and the xcode comamnd line?"
  #Get response
  read -p "Install git and xcode cli? (y/n) "  -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]
  then
        echo "Installing git and xcode"
        xcode-select --install
        git=$(which git)
        if [ "$git" != "" ]
        then
          echo "Git is installed"
        else
          echo "Git is not installed"
          exit 1
        fi
  else
        echo "Git and xcode will not be installed"
  fi
fi
echo "Cloning The Package Manager..."
sudo mkdir -p /usr/local/ferment
sudo chmod -R 777 /usr/local/ferment
git clone https://github.com/ferment-pkg/ferment /usr/local/ferment/
#check is zshrc is installed
if test -f "$HOME/.zshrc"
then
  echo "Zshrc is already made, skipping"
else
  echo "Zshrc is not created, creating now..."
  touch ~/.zshrc
fi
echo "Running Installation Script..."
cd /usr/local/ferment/
sh install.sh
echo "ferment is installed, please restart your terminal or run source ~/.zshrc"
exit 0