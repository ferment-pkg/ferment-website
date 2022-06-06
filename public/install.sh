fermentPATH=$(which ferment)
isXcodeCLIInstalled=$(xcode-select -p)
read -p "This Script Requires Sudo, Continue? (y/n)" -r -n 1 -s </dev/tty || {
  REPLY="y"
}

# exit if reply is n/N
echo
if [[ $REPLY =~ ^[Nn]$ ]]
then
  echo "Exiting..."
  exit 1
fi


function run(){
  if [ "$fermentPATH" != "" ]
  then
    echo "ferment is already installed"
    exit 1
  fi
  echo "Installing ferment"
  if [ "$isXcodeCLIInstalled" = "" ]
  then
    echo "xcode comamnd line is not installed..."
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
  fi
  echo "Cloning The Package Manager..."
  sudo mkdir /usr/local/bin
  sudo mkdir -p /usr/local/ferment
  sudo chgrp admin /usr/local/ferment
  sudo chgrp admin /usr/local/bin
  sudo chmod -R 2775 /usr/local/ferment
  git clone --recurse-submodules -j8 https://github.com/ferment-pkg/ferment /usr/local/ferment/
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
}
run
