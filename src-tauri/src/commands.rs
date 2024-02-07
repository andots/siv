use std::path::PathBuf;

use crate::utils::set_shadow_to_window;

#[tauri::command]
pub async fn create_window(
    app: tauri::AppHandle,
    label: String,
    path: String,
) -> Result<(), String> {
    let mut config = app.config().tauri.windows.first().unwrap().clone();
    config.label = label; // set given label
    config.url = tauri::WindowUrl::App(PathBuf::from(path)); // set given path
    let window = tauri::WindowBuilder::from_config(&app, config)
        .build()
        .expect("Can't open new window!");

    set_shadow_to_window(&window).unwrap();

    Ok(())
}
