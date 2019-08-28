'use strict';

const electron = require('electron');

const app = electron.app
const createTray = require('./tray');
const {setExiting, createWindow} = require('./window');

let mainWindow;

if (!app.requestSingleInstanceLock()) {
  app.quit();
}

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.show();
  }
})

/*
 * This method will be called when Electron has finished
 * initialization and is ready to create browser windows.
 * Some APIs can only be used after this event occurs.
 */
app.on('ready', () => {
  createTray()
  mainWindow = createWindow()
});

/*
 * On macOS it's common to re-create a window in the app when the
 * dock icon is clicked and there are no other windows open.
 */
app.on('activate', () => {
  mainWindow.show()
});

app.on('before-quit', () => {  
  setExiting(true);
  if (!mainWindow.isFullScreen()) {
    settings.set('lastWindowState', mainWindow.getBounds());
  }
});
