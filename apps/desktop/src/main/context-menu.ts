import { Menu, BrowserWindow } from 'electron'

export function setupContextMenu(window: BrowserWindow): void {
  window.webContents.on('context-menu', (_event, params) => {
    const menuItems: Electron.MenuItemConstructorOptions[] = []

    // Text editing options
    if (params.isEditable) {
      menuItems.push(
        { role: 'undo', enabled: params.editFlags.canUndo },
        { role: 'redo', enabled: params.editFlags.canRedo },
        { type: 'separator' },
        { role: 'cut', enabled: params.editFlags.canCut },
        { role: 'copy', enabled: params.editFlags.canCopy },
        { role: 'paste', enabled: params.editFlags.canPaste },
        { role: 'selectAll', enabled: params.editFlags.canSelectAll }
      )
    } else if (params.selectionText.length > 0) {
      // Text selection in non-editable area
      menuItems.push({ role: 'copy' }, { type: 'separator' }, { role: 'selectAll' })
    } else {
      // Default context (no selection, not editable)
      menuItems.push({ role: 'selectAll' })
    }

    // Link handling
    if (params.linkURL) {
      menuItems.push(
        { type: 'separator' },
        {
          label: 'Open Link in Browser',
          click: (): void => {
            import('electron').then(({ shell }) => {
              shell.openExternal(params.linkURL)
            })
          }
        },
        {
          label: 'Copy Link',
          click: (): void => {
            import('electron').then(({ clipboard }) => {
              clipboard.writeText(params.linkURL)
            })
          }
        }
      )
    }

    // Dev tools (only in development or with modifier)
    if (process.env.NODE_ENV === 'development' || params.y < 0) {
      menuItems.push({ type: 'separator' }, { role: 'toggleDevTools' })
    }

    const menu = Menu.buildFromTemplate(menuItems)
    menu.popup({ window })
  })
}
