use std::path::PathBuf;

use tauri::{Manager, WindowUrl};
use window_shadows::set_shadow;

#[tauri::command]
pub fn apply_set_shadow(window: tauri::Window, label: String) {
    if let Some(target) = window.get_window(&label) {
        set_shadow(&target, true).expect("Unsupported Platform!");
    }
}

#[tauri::command]
pub async fn create_window(
    app: tauri::AppHandle,
    label: String,
    path: String,
) -> Result<(), String> {
    let mut config = app.config().tauri.windows.get(0).unwrap().clone();
    config.label = label; // set given label
    config.url = WindowUrl::App(PathBuf::from(path)); // set given path
    let window = tauri::window::WindowBuilder::from_config(&app, config)
        .build()
        .expect("Can't open new window!");
    window_shadows::set_shadow(&window, true).expect("Window Shadow: Unsupported Platform!");
    Ok(())
}

// let window =
//     tauri::window::WindowBuilder::new(&app, &label, tauri::WindowUrl::App(path.into()))
//         .title(config.title)
//         .decorations(config.decorations)
//         .fullscreen(config.fullscreen)
//         .resizable(config.resizable)
//         .inner_size(config.width, config.height)
//         .min_inner_size(
//             config.min_width.unwrap_or(300.),
//             config.min_height.unwrap_or(300.),
//         )
//         .build()
//         .expect("Can't open new window.");
