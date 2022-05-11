import os
import requests
os.chdir("/tmp")
res=requests.get("https://ferment.tk/install.sh")
#get content
content=res.content
with open("install.sh", "wb") as f:
    f.write(content)
    f.close()
#run install.sh
os.system("sh install.sh")