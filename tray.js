
'use strict';

const electron = require('electron')

const app = electron.app
const Tray = electron.Tray
const Menu = electron.Menu
const shell = electron.shell
const path = require('path')

const createWindow = require('./window');

let tray, contextMenu

module.exports = function createTray() {

    //create tray icon
    tray = new Tray(path.join(__dirname, 'static/icon.png'))

    // create context menu
    contextMenu = Menu.buildFromTemplate([
        {
            label: "Open Azure DevOps", click() {
                createWindow()
            }
        },
        { label: "Quit", click() { app.quit() } },
        { type: "separator" },
        {
            label: "GitHub", click() {
                shell.openExternal('https://github.com/CellarD0-0r/whatever')
            }
        }
    ])

    tray.setContextMenu(contextMenu)
}