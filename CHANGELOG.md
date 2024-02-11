# Changelog

# [0.13.0](https://github.com/andots/siv/compare/v0.12.0...v0.13.0) (2024-02-11)


### Bug Fixes

* filter windows on the same monitor ([9e6051f](https://github.com/andots/siv/commit/9e6051f52286bf63a5edfa62f45bb2e2e6191200))
* tile windows only if window_count larger than 2 ([713c3a1](https://github.com/andots/siv/commit/713c3a1d943b361633f5d6725000d59c5009974c))
* use get_window not get_focused_window ([19068a9](https://github.com/andots/siv/commit/19068a991bbd3cc165206caa1b5801bb1b3a7d51))
* use map_err for create_window ([4e1e5fd](https://github.com/andots/siv/commit/4e1e5fd56d53b716fc9b3b11a871bd27f6613c63))


### Features

* maximize window when one window opened with Control+T ([ed87eb7](https://github.com/andots/siv/commit/ed87eb7f31f9e35c28555e93fdbaf6a116e9612e))
* tile vertical all windows with Control+T ([fd77984](https://github.com/andots/siv/commit/fd7798460e61b22c319c1a25b14fb854e0743cfb))
* tile window to the target monitor ([aa7ca48](https://github.com/andots/siv/commit/aa7ca48e35dbf01b8a2b548e68d5e3bb310474dc))

# [0.12.0](https://github.com/andots/siv/compare/v0.11.1...v0.12.0) (2024-02-10)


### Bug Fixes

* remove close button on dialog.tsx ([f2a05d7](https://github.com/andots/siv/commit/f2a05d71ac75cc1ffc096757faaeb929e1672003))


### Features

* control global updater state ([02ec883](https://github.com/andots/siv/commit/02ec883fad1ecc4348fb8813853bd0c528841eb5))
* get app name and title in invokes ([38aa3c7](https://github.com/andots/siv/commit/38aa3c718061265445a912b59e9a8bb2757d1ff3))
* updater with custom dialog ([0ea9681](https://github.com/andots/siv/commit/0ea968176dfa95fc61a6e674f3e93cdab9522fef))

## [0.11.1](https://github.com/andots/siv/compare/v0.11.0...v0.11.1) (2024-02-10)


### Bug Fixes

* check array length > 1 to go next and prev ([a969b11](https://github.com/andots/siv/commit/a969b118a1c91bcd49fb8599be0acc56c7d87202))
* remove content_first(true) to get images in dir correctly, also filter by entry is_file ([b51b1a0](https://github.com/andots/siv/commit/b51b1a07cbfeddbd3008d8e9b373a931db69083f))

# [0.11.0](https://github.com/andots/siv/compare/v0.10.1...v0.11.0) (2024-02-10)


### Bug Fixes

* make eventlistener to close window, it should not be a global shortcut ([5f38d6c](https://github.com/andots/siv/commit/5f38d6cfe48c9436173268a92e93f40e4012ea18))
* set image height to container size according to original size ([4e4c4e1](https://github.com/andots/siv/commit/4e4c4e1d152fc3f552eaf8439569fcf4a4483af5))


### Features

* reset zoom and position by r key ([df18ec4](https://github.com/andots/siv/commit/df18ec4d4d01e7c1691d998886d4152826d9795e))

## [0.10.1](https://github.com/andots/siv/compare/v0.10.0...v0.10.1) (2024-02-09)


### Bug Fixes

* arrow keys for moving image's position ([21a15fb](https://github.com/andots/siv/commit/21a15fbec01d7a915f3c9508007329d64e383f87))
* update App icon ([1bae8f2](https://github.com/andots/siv/commit/1bae8f21f7f7f9aa5caf5a866051185e7947ac0d))

# [0.10.0](https://github.com/andots/siv/compare/v0.9.0...v0.10.0) (2024-02-09)


### Bug Fixes

* don't need to open devtools for new window thanks to log plugin ([ba3726f](https://github.com/andots/siv/commit/ba3726fbe3792213b80d5a241ef884b6f6840003))
* load image with getMatches in initApp and check window is main or not ([81cd472](https://github.com/andots/siv/commit/81cd47244db7a99ec243e9cc937dec86744951c7))
* open window by Control+O ([ef9ce63](https://github.com/andots/siv/commit/ef9ce637908ba6ddd21a169a1f1de7b86b75db72))
* register shorcuts in initApp ([3c44427](https://github.com/andots/siv/commit/3c44427cf0492b59ab5d01e3f505362ba109fad1))
* remove console.log ([76dd8a9](https://github.com/andots/siv/commit/76dd8a954bfef26e8030732556c5f1ef787c8a06))
* use WebviewWindow.getFocusedWindow() to close window with shortcut ([d5bfe03](https://github.com/andots/siv/commit/d5bfe03cf1d70cc141b71a9c127e5d35c8932d49))


### Features

* create window label with ulidx ([fe6523b](https://github.com/andots/siv/commit/fe6523b73e575299f0a673ad259370deac7667d9))
* logging with tauri-plugin-log ([3d89d15](https://github.com/andots/siv/commit/3d89d151526c5bd9f4478f70c03a3d94d3f4abd2))
* register global shortcuts ([d9b4acb](https://github.com/andots/siv/commit/d9b4acb58d56a5d9710514dc12f5bf993b8d1c7f))
* show logs with each level ([925a33e](https://github.com/andots/siv/commit/925a33ec24bcc87dac3713cb0f944fdbe67a734c))

# [0.9.0](https://github.com/andots/siv/compare/v0.8.1...v0.9.0) (2024-02-08)


### Bug Fixes

* add apng for listing images ([70b834a](https://github.com/andots/siv/commit/70b834a7b8d8f4ceaee1cfe7357249751d3aef24))
* add select-none to the App div ([7320668](https://github.com/andots/siv/commit/73206686d88c7db077f886cebd6d8254d26177ee))
* open devtools in create_window ([1fe97ee](https://github.com/andots/siv/commit/1fe97ee54c2ab7084fea65d6260e9f067f1d3fdb))
* wheel event must be passive: true ([becdf6e](https://github.com/andots/siv/commit/becdf6e41dcf0e744c4022e804c0507c2c67ab41))


### Features

* keyboard shortcuts ([db74aa9](https://github.com/andots/siv/commit/db74aa9bf5f2826bdf22c38b038ec7600170ed0b))
* traverse next/prev image with new state management logic ([f2ec22d](https://github.com/andots/siv/commit/f2ec22d84c8ebadd45ef80a49c6de9fcfe58217b))


### Performance Improvements

* get images in Rust side ([088a075](https://github.com/andots/siv/commit/088a075928c45f5e9ca7f709d80b496b5ed48c84))

## [0.8.1](https://github.com/andots/siv/compare/v0.8.0...v0.8.1) (2024-02-06)


### Bug Fixes

* apply set_shadow Windows and Mac only ([969ccab](https://github.com/andots/siv/commit/969ccabf0fe3693aeadc09e680fe9fd0eb418641))
* updater installMode to passive ([f2711dd](https://github.com/andots/siv/commit/f2711ddf92355e9a329d7c148ac78295b6162d2d))

# [0.8.0](https://github.com/andots/siv/compare/v0.7.0...v0.8.0) (2024-02-06)


### Bug Fixes

* Set default window title in tauri.conf.json ([e076ef8](https://github.com/andots/siv/commit/e076ef8c6263e98bb8c32633c135fa28e3db8574))


### Features

* create new window from Rust side ([8e41805](https://github.com/andots/siv/commit/8e41805088ee11e4e24e6944a7ebae5db0efeb6a))

# [0.7.0](https://github.com/andots/siv/compare/v0.6.2...v0.7.0) (2024-02-05)


### Features

* Auto updater using Tauri built-in updater ([1dc7ccf](https://github.com/andots/siv/commit/1dc7ccff110e035a8ff1d13f03dc2db75991113e))

## [0.6.2](https://github.com/andots/siv/compare/v0.6.1...v0.6.2) (2024-02-05)


### Bug Fixes

* Fix folder name to github/workflows ([0b369df](https://github.com/andots/siv/commit/0b369df387b8c0c7d930a1d98e2740091e61a5a5))

## [0.6.1](https://github.com/andots/siv/compare/v0.6.0...v0.6.1) (2024-02-05)

# [0.6.0](https://github.com/andots/siv/compare/v0.5.2...v0.6.0) (2024-02-04)


### Bug Fixes

* empty check for filePath in createEffect ([fd70466](https://github.com/andots/siv/commit/fd704669029eca225a4edc57aa749563d6389592))


### Features

* apply set_shadow after creating new window ([85e26ff](https://github.com/andots/siv/commit/85e26ffef6a88d0b76c0767be5d7f7e42132453f))

## [0.5.2](https://github.com/andots/siv/compare/v0.5.1...v0.5.2) (2024-02-04)


### Bug Fixes

* change icon according to maximized state ([13ea770](https://github.com/andots/siv/commit/13ea77002d469bd6f7e1b5ba356efd5127428485))

## [0.5.1](https://github.com/andots/siv/compare/v0.5.0...v0.5.1) (2024-02-04)


### Bug Fixes

* make 4px margin for data-tauri-drag-region ([67fde7f](https://github.com/andots/siv/commit/67fde7f8c9c18d03c7c5d75c3d14606b63c5df28))
* make smaller titlebar title region ([75a533b](https://github.com/andots/siv/commit/75a533be93b8d625df071a43b8c8e2fc34ade2ba))

# [0.5.0](https://github.com/andots/siv/compare/v0.4.0...v0.5.0) (2024-02-04)


### Bug Fixes

* buttons on titlebar must be on right with no space ([61aa4e1](https://github.com/andots/siv/commit/61aa4e10bb0a69b39b110ba608250b1164c39ea7))
* return sorted images array by ASC ([2f40cb3](https://github.com/andots/siv/commit/2f40cb3659c8d4e4933e1953fba83eb7e53cc883))


### Features

* file traversing prev and next ([10599d9](https://github.com/andots/siv/commit/10599d93c1e867dfa3284d64ca8bb9e9115fcd0c))

# [0.4.0](https://github.com/andots/siv/compare/v0.3.0...v0.4.0) (2024-02-03)


### Bug Fixes

* add data-tauri-drag-region correctly ([6a37254](https://github.com/andots/siv/commit/6a37254944b05568bb7aefc693f6a957fc457b9f))
* set default title as app name and version onMount ([b07f72f](https://github.com/andots/siv/commit/b07f72f1ab79107b65074aebc22352695c043c93))
* use appWindow.toggleMaximize() ([c2e734a](https://github.com/andots/siv/commit/c2e734a0efc414b01614c524f0ae5b301be77797))


### Features

* show filename on titlebar ([ba18065](https://github.com/andots/siv/commit/ba1806581d7b887d797d68a1a3ff304a5ce050af))

# [0.3.0](https://github.com/andots/siv/compare/v0.2.1...v0.3.0) (2024-02-03)


### Features

* custom titlebar and window shadow ([29a3816](https://github.com/andots/siv/commit/29a38162671896e45e704920d368593cea7661ac))

## [0.2.1](https://github.com/andots/siv/compare/v0.2.0...v0.2.1) (2024-02-03)

### Bug Fixes

- fit image in container onLoad ([be71aaa](https://github.com/andots/siv/commit/be71aaa83a3e2b79dbd809373e2280743bc7ac74))
- reset scale and position onLoadImage ([d42882d](https://github.com/andots/siv/commit/d42882d6f4473e278bbe089ff55e76f917f6602e))

## [0.2.0](https://github.com/andots/siv/compare/v0.1.1...v0.2.0) (2024-02-02)

### Features

- show app version on title bar ([8a473b7](https://github.com/andots/siv/commit/8a473b73748922419c145c41841f4f8695d68b48))
