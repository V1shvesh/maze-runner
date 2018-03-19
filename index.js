const {app, BrowserWindow} = require('electron')

const path = require('path')
const url = require('url')

let win;

function createWindow() {
	win = new BrowserWindow({width: 1000, height: 1000})

	win.loadURL('http://localhost:8080/')

	win.on('closed', ()=>{
		win = null
	})
}

app.on('ready', createWindow)