# Overview
This is a basic python and electron app

Uses:
- [Python Flask](https://flask.palletsprojects.com/en/2.1.x/)
- [Electron JS](https://www.electronjs.org/)

Read:
https://stackoverflow.com/questions/32158738/python-on-electron-framework#:~:text=You%20can%20use%20python%2Dshell,communication%20and%20better%20error%20handling.


Folders:
- ui - Electron UI
- service - Flask backend

# Setup


## service
```
cd service

# create virtual env
python -m venv env

# on Windows
env\scripts\activate

pip install -r requirements.txt

```

## ui
```
cd ui
npm install

# start application
npm start
```
