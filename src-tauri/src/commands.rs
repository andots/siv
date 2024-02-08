use std::path::{Path, PathBuf};

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
        .expect("Can't open new window!");

    set_shadow_to_window(&window).unwrap();

    Ok(())
}

fn is_image(entry: &DirEntry) -> bool {
    let mut flag = false;
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
        let walker = WalkDir::new(dir)
            .contents_first(true)
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
