# SIV - Simple Image Viewer

SIV is a simple image viewer made with Tauri and SolidJS.

![demo](docs/demo.jpg)

## 🚀 Features

- [x] Minimalistic UI - Image and only small control bar on top.
- [x] Multiple windows.
- [x] Open from OS file explorer/finder.
- [x] Open from shell command (e.g. siv.exe /path/to/file.png).
- [x] Open with Drop & Drop image on window.
- [ ] Open with file dialog.
- [x] Zoom in/out with mouse wheel.
- [x] Move position of image by dragging in window.
- [x] Traversing images in folder.
- [x] Supports file formats: `png`, `jpg`, `jpeg`, `webp`, `svg`, `gif`, `avif`, `jpe`, `jif`, `jfif`
- [ ] Keyboard shortcuts.
- [ ] Tile windows.

## ⌨️ Shortcuts

| Commands            | Functions                        |
| ------------------- | -------------------------------- |
| + / -               | Zoom in/out                      |
| ArrowRight, >, j, n | Show next image in directory     |
| ArrowLeft, <, k, p  | Show previous image in directory |
| o                   | Open new window                  |
| t                   | Title windows                    |

## ⛏️ Development

```bash
# dev
pnpm tauri dev
# build
pnpm tauri build
# release
pnpm release
```

<style>
img
{
    display:block;
    float:none;
    margin-left:auto;
    margin-right:auto;
    width:80%;
}
</style>
