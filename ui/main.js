const { app, BrowserWindow } = require('electron')
const path = require('path')

app.whenReady().then(() => {
  var subpy = require( "child_process" ).spawn( "python", [ "../service/hello.py" ] );
  // var subpy = require( "child_process" ).spawn( "./dist/hello.exe" );
  var rp = require( "request-promise" );
  var mainAddr = "http://localhost:5000";

  function createWindow () {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegrationInWorker: true,
      }
    })
    win.loadURL( "http://localhost:5000" );
    // win.webContents.openDevTools();
    win.on(
        "closed",
        function()
        {
            mainWindow = null;
            subpy.kill( "SIGINT" );
        }
    );
    // win.loadFile('index.html')
  }


  var StartUp = function()
  {
      rp( mainAddr )
      .then(
          function( htmlString )
          {
              console.log( "server started!" );
              // OpenWindow();
              createWindow()
          }
      )
      .catch(
          function( err )
          {
              console.log( "waiting for the server start..." );
              // without tail call optimization this is a potential stack overflow
              StartUp();
          }
      );
  };

  // fire!
  StartUp();

  // createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
