const { app, BrowserWindow, autoUpdater, dialog } = require("electron");
const path = require("path");
require("update-electron-app")();

if (require("electron-squirrel-startup")) app.quit();

const server = "https://bq-5aouelt6z-loneth.vercel.app/";
const url = `${server}/update/${process.platform}/${app.getVersion()}`;

autoUpdater.setFeedURL({ url });

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
    icon: root + "/images/LOGO-1024.png",
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

  setInterval(() => {
    autoUpdater.checkForUpdates();
  }, 60000);

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

autoUpdater.on("update-downloaded", (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: "info",
    buttons: ["Restart", "Later"],
    title: "Application Update",
    message: process.platform === "win32" ? releaseNotes : releaseName,
    detail:
      "A new version has been downloaded. Restart the application to apply the updates.",
  };

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall();
  });
});

autoUpdater.on("error", (message) => {
  console.error("There was a problem updating the application");
  console.error(message);
});
