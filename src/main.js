import { app, BrowserWindow, Tray, Menu } from "electron";
import path from "node:path";
import started from "electron-squirrel-startup";

if (started) {
  app.quit();
}

let mainWindow;
let tray;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 300,
    height: 500,
    resizable: false,
    frame: false,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }
};

const createTray = () => {
  const iconPath = path.join(__dirname, "/icon.png");
  tray = new Tray(iconPath);
  tray.on("click", (event, bounds) => {
    const { x, y, width: trayWidth, height: trayHeight } = bounds;
    const windowBounds = mainWindow.getBounds();

    const align = "left";

    let windowX;
    if (align === "left") {
      windowX = x;
    } else if (align === "right") {
      windowX = x + trayWidth - windowBounds.width;
    }

    const windowY = y + trayHeight;

    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.setBounds({
        x: windowX,
        y: windowY,
        width: windowBounds.width,
        height: windowBounds.height,
      });
      mainWindow.show();
      mainWindow.focus();
    }
  });
};

app.whenReady().then(() => {
  createWindow();
  createTray();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
