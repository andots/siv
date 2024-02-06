// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;

use tauri::Manager;
use window_shadows::set_shadow;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let _window = app.get_window("main").unwrap();

            // Apply set_shadow to the window (Windows and MacOS only)
            #[cfg(any(windows, target_os = "macos"))]
            {
                set_shadow(&_window, true).expect("Window Shadow: Unsupported Platform!");
            }

            // open devtools on debug builds
            #[cfg(debug_assertions)]
            {
                _window.open_devtools();
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::apply_set_shadow,
            commands::create_window
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
