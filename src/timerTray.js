import { Tray } from "electron";
import { Menu } from "electron";
class TimerTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);
    this.mainWindow = mainWindow;
    this.setToolTip("Timer App");
    this.on("click", this.onClick);
    this.on("right-click", this.onRightClick);
  }

  onClick = (event, bounds) => {
    const { x, y, width: trayWidth, height: trayHeight } = bounds;
    const windowBounds = this.mainWindow.getBounds();

    const align = "left";

    let windowX;
    if (align === "left") {
      windowX = x;
    } else if (align === "right") {
      windowX = x + trayWidth - windowBounds.width;
    }

    const windowY = y + trayHeight;

    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
    } else {
      this.mainWindow.setBounds({
        x: windowX,
        y: windowY,
        width: windowBounds.width,
        height: windowBounds.height,
      });
      this.mainWindow.show();
      this.mainWindow.focus();
    }
  };

  onRightClick = () => {
    const menuConfig = Menu.buildFromTemplate([
      {
        role: "quit",
      },
    ]);
    this.popUpContextMenu(menuConfig);
  };
}

export default TimerTray;
