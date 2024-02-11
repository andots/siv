use std::path::{Path, PathBuf};

use log::debug;
use tauri::{Manager, PhysicalPosition, PhysicalSize, Window};
use walkdir::{DirEntry, WalkDir};

use crate::utils::set_shadow_to_window;

#[tauri::command]
pub async fn get_default_app_title(app: tauri::AppHandle) -> String {
    let title = format!(
        "{} - v{}",
        app.package_info().name,
        app.package_info().version
    );
    title
}

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
        .map_err(|e| e.to_string())?;

    set_shadow_to_window(&window).map_err(|e| e.to_string())?;

    Ok(())
}

fn is_image(entry: &DirEntry) -> bool {
    let mut flag = false;
    if entry.file_type().is_file() {
        if let Some(ext) = entry.path().extension() {
            if ext.eq_ignore_ascii_case("png")
                || ext.eq_ignore_ascii_case("jpg")
                || ext.eq_ignore_ascii_case("jpeg")
                || ext.eq_ignore_ascii_case("webp")
                || ext.eq_ignore_ascii_case("svg")
                || ext.eq_ignore_ascii_case("gif")
                || ext.eq_ignore_ascii_case("avif")
                || ext.eq_ignore_ascii_case("apng")
                || ext.eq_ignore_ascii_case("jpe")
                || ext.eq_ignore_ascii_case("jif")
                || ext.eq_ignore_ascii_case("jfif")
            {
                flag = true;
            }
        }
    }
    flag
}

#[tauri::command]
pub fn get_images_in_dir(path: String) -> Result<Vec<String>, String> {
    let p = Path::new(&path);
    if p.exists() {
        let dir = if p.is_file() {
            p.parent().expect("parent doesn't exists")
        } else {
            p
        };
        // https://docs.rs/walkdir/latest/walkdir/struct.FilterEntry.html#method.filter_entry
        // If the iterator has contents_first enabled,
        // then this method is no different than calling the standard Iterator::filter method
        // (because directory entries are yielded after they’ve been descended into).
        let walker = WalkDir::new(dir)
            .sort_by_file_name()
            .min_depth(1)
            .max_depth(1)
            .follow_links(false)
            .into_iter()
            .filter_entry(is_image)
            .filter_map(|e| e.ok())
            .map(|d| d.path().to_string_lossy().to_string())
            .collect::<Vec<_>>();
        Ok(walker)
    } else {
        Err(String::from("path is not exists."))
    }
}

#[tauri::command]
pub fn tile_windows(app: tauri::AppHandle, label: String) -> Result<(), String> {
    let invoked_window = match app.get_window(&label) {
        Some(v) => v,
        None => return Err(String::from("Window not found")),
    };

    // target_monitor value is like below
    // Monitor { name: Some("\\\\.\\DISPLAY2"),
    // size: PhysicalSize { width: 1920, height: 1080 },
    // position: PhysicalPosition { x: -1920, y: 360 }, scale_factor: 1.0 }
    let target_monitor = match invoked_window.current_monitor() {
        Ok(v) => match v {
            Some(v) => v,
            None => return Err(String::from("No monitor")),
        },
        Err(e) => return Err(e.to_string()),
    };

    let target_monitor_name = match target_monitor.name() {
        Some(v) => v,
        None => return Err(String::from("Monitor name not found")),
    };

    let mut filtered_windows: Vec<Window> = vec![];
    for (_label, window) in app.windows() {
        if let Ok(Some(monitor)) = window.current_monitor() {
            if let Some(monitor_name) = monitor.name() {
                if monitor_name == target_monitor_name {
                    filtered_windows.push(window)
                }
            }
        }
    }

    debug!("tile_windows: invoked from {}", &label);
    debug!("target_monitor = {:?}", target_monitor);

    let window_count = filtered_windows.len() as i32;
    let monitor_width = target_monitor.size().width as i32;
    let monitor_height = target_monitor.size().height as i32;
    let monitor_pos = target_monitor.position();
    if window_count >= 2 {
        for (i, window) in filtered_windows.iter().enumerate() {
            // let windows_taskbar_size = 30;
            let size = PhysicalSize {
                width: monitor_width / window_count,
                height: monitor_height,
            };
            let pos: PhysicalPosition<i32> = PhysicalPosition {
                x: monitor_pos.x + size.width * i as i32,
                y: monitor_pos.y,
            };
            window.set_size(size).map_err(|e| e.to_string())?;
            window.set_position(pos).map_err(|e| e.to_string())?;
        }
    }

    Ok(())
}

#[cfg(test)]
mod tests {

    use std::env;

    use super::get_images_in_dir;

    #[test]
    fn test_get_images_in_dir() {
        let result = get_images_in_dir(String::from("path"));
        assert!(result.is_err());
        let result = get_images_in_dir(String::from("path/to/file"));
        assert!(result.is_err());

        let assets_dir = env::current_dir().unwrap().join("test_assets");
        let result: Result<Vec<String>, String> =
            get_images_in_dir(assets_dir.to_string_lossy().to_string());
        assert!(result.is_ok());
        println!("{:?}", result);
        assert_eq!(result.ok().unwrap().len(), 3);
    }

    #[test]
    fn test_get_images_in_dir_with_filepath() {
        let file_path = env::current_dir()
            .unwrap()
            .join("test_assets")
            .join("animation.gif");
        let result: Result<Vec<String>, String> =
            get_images_in_dir(file_path.to_string_lossy().to_string());
        assert!(result.is_ok());
        println!("{:?}", result);
        assert_eq!(result.ok().unwrap().len(), 3);
    }
}
