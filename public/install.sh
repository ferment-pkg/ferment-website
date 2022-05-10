isGitInstalled=$(which git)
fermentPATH=$(which ferment)
if [ "$fermentPATH" != "" ]; then
  echo "Ferment is already installed"
  exit 0
fi
if [ "$isGitInstalled" = "" ]; then
  echo "Git is not installed, would you like to install git and the xcode comamnd line?"
  #Get response
  read -p "Install git and xcode? (y/n) " -n 1 -r
  echo    # (optional) move to a new line
  if [[ $REPLY =~ ^[Yy]$ ]]
  then
        echo "Installing git and xcode"
        xcode-select --install
        git=$(which git)
        if [ "$git" != "" ]; then
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
mkdir -p /usr/local/Ferment
chmod -R 777 /usr/local/Ferment
git clone https://github.com/ferment-pkg/ferment /usr/local/ferment/
echo "Running Installation Script..."
cd /usr/local/ferment/
sh install.sh
source ~/.zshrc
