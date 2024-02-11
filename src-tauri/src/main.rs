// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod utils;

use tauri::Manager;
use utils::set_shadow_to_window;

use tauri_plugin_log::{
    fern::colors::{Color, ColoredLevelConfig},
    LogTarget,
};

#[cfg(debug_assertions)]
const LOG_TARGETS: [LogTarget; 2] = [LogTarget::Stdout, LogTarget::Webview];

#[cfg(not(debug_assertions))]
const LOG_TARGETS: [LogTarget; 2] = [LogTarget::Stdout, LogTarget::LogDir];

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
        .plugin(
            tauri_plugin_log::Builder::default()
                .targets(LOG_TARGETS)
                .with_colors(
                    ColoredLevelConfig::default()
                        .debug(Color::BrightGreen)
                        .info(Color::BrightBlue)
                        .warn(Color::Yellow)
                        .trace(Color::BrightCyan),
                )
                .build(),
        )
        .invoke_handler(tauri::generate_handler![
            commands::create_window,
            commands::get_default_app_title,
            commands::get_images_in_dir,
            commands::tile_windows,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
