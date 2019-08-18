'use strict';

let mainWindow;

const electron = require('electron')
const shell = electron.shell
const BrowserWindow = electron.BrowserWindow


module.exports = function createWindow() {

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: { nodeIntegration: false },
    show: false
  })

  //load the url
  mainWindow.loadURL('https://login.microsoftonline.com/common/oauth2/authorize?client_id=499b84ac-1321-427f-aa17-267ca6975798&site_id=501454&response_mode=form_post&response_type=code+id_token&redirect_uri=https%3A%2F%2Fapp.vssps.visualstudio.com%2F_signedin&nonce=5db34631-406c-4d43-a2ce-c73bfafe3cdc&state=realm%3Ddev.azure.com%26reply_to%3Dhttps%253A%252F%252Fdev.azure.com%252F%26ht%3D3%26nonce%3D5db34631-406c-4d43-a2ce-c73bfafe3cdc%26githubsi%3Dtrue%26WebUserId%3D2E5AA357D82669A734BCAB01DC266F5F&resource=https%3A%2F%2Fmanagement.core.windows.net%2F&cid=5db34631-406c-4d43-a2ce-c73bfafe3cdc&wsucxt=1&githubsi=true&msaoauth2=true')

  //hide the default menu
  mainWindow.setMenu(null)

  //prevent window title changing
  mainWindow.on('page-title-updated', event => {
    event.preventDefault()
  })

  //when contents are loaded, show main window
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  // Emitted when the window is closed.
  mainWindow.on('close', function () {
    if (mainWindow !== null) { mainWindow = null }
  })

  mainWindow.webContents.on('new-window', (event, url) => {
    // stop Electron from opening another BrowserWindow
    event.preventDefault()

    // open the url in the default system browser
    var urlDest = url.split('=')[1]
    shell.openExternal(decodeURIComponent(urlDest))
  })

}