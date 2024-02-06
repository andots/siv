// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod utils;

use tauri::Manager;
use utils::set_shadow_to_window;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            set_shadow_to_window(&window).unwrap();

            // open devtools on debug builds
            #[cfg(debug_assertions)]
            {
                window.open_devtools();
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![commands::create_window])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
