# SIV - Simple Image Viewer

SIV is a simple image viewer made with Tauri and SolidJS.

![demo](docs/demo.jpg)

## 🚀 Features

- [x] Minimalistic UI - Image and only small control bar on top.
- [x] Multiple windows.
- [x] Open from OS file explorer/finder.
- [x] Open from shell command (e.g. siv.exe /path/to/file.png).
- [x] Open with Drop & Drop image on window.
- [x] Zoom in/out with mouse wheel.
- [x] Move position of image by dragging in window.
- [x] Traversing images in folder.
- [x] Supports file formats: `png`, `jpg`, `jpeg`, `webp`, `svg`, `gif`, `avif`, `jpe`, `jif`, `jfif`
- [x] Keyboard shortcuts.
- [x] Tile windows.
- [ ] Open with file dialog.

## ⌨️ Shortcuts

| Commands                  | Functions                   |
| ------------------------- | --------------------------- |
| +, z, f, Mouse wheel up   | Zoom in                     |
| -, x, d, Mouse wheel down | Zoom out                    |
| >, n                      | Next image in directory     |
| <, p                      | Previous image in directory |
| j, ArrowDown (️↓)         | Move down image position    |
| k, ArrowUp (↑)            | Move up image position      |
| l, ArrowRight (→)         | Move right image position   |
| h, ArrowLeft (←)          | Move left image position    |
| r                         | Reset position and zoom     |
| Control + O               | Open new window             |
| Control + T               | Tile windows                |
| Control + W               | Close window                |
| Control + Q               | Close all windows           |

## ⛏️ Development

```bash
# dev
pnpm tauri dev
# build
pnpm tauri build
# release
pnpm release
# add ui component from solid-ui-component https://solid-ui-components.vercel.app/
pnpm dlx solidui-cli@latest add
```

## 🔗 Links

App Icon: [gonum (glyph)](https://www.iconfinder.com/icons/9075826/photo_gallery_frame_picture_image_wall_icon)
Icons: [icons grommet](https://icons.grommet.io/)
UI Components: [solid-ui](https://solid-ui-components.vercel.app/)
