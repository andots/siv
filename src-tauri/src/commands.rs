use std::path::PathBuf;

use tauri::WebviewUrl;

// use crate::utils::set_shadow_to_window;

#[tauri::command]
pub async fn create_window(
    app: tauri::AppHandle,
    label: String,
    path: String,
) -> Result<(), String> {
    let mut config = app.config().app.windows.first().unwrap().clone();
    config.label = label; // set given label
    config.url = WebviewUrl::App(PathBuf::from(&path)); // set given path
    let _window = tauri::WebviewWindowBuilder::from_config(&app, &config)
        .unwrap()
        .build()
        .expect("Can't open new window!");

    Ok(())
}
