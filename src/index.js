const { app, BrowserWindow } = require("electron");
const path = require("path");

if (require('electron-squirrel-startup')) app.quit();

let URL = "https://game.aq.com/game/";
let root = __dirname;
let pluginName;
let win;

switch (process.platform) {
  case "win32":
    pluginName =
      process.arch == "x64"
        ? "x64/pepflashplayer.dll"
        : "x32/pepflashplayer32.dll";
    break;
  default:
    pluginName = "x64/pepflashplayer.dll";
    break;
}

app.commandLine.appendSwitch(
  "ppapi-flash-path",
  path.join(__dirname + "/plugins/" + pluginName)
);
app.commandLine.appendSwitch("ppapi-flash-version", "32.0.0.371");

const createWindow = () => {
  win = new BrowserWindow({
    icon: root + '/images/LOGO-1024.png',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      devTools: true,
      plugins: true,
    },
  });
  win.maximize();
  win.loadURL(URL);
};

app.whenReady().then(() => {
  app.allowRendererProcessReuse = false;

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
