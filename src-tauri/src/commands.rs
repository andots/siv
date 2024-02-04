use tauri::Manager;
use window_shadows::set_shadow;

#[tauri::command]
pub fn apply_set_shadow(window: tauri::Window, label: String) {
    if let Some(target) = window.get_window(&label) {
        set_shadow(&target, true).expect("Unsupported Platform!");
    }
}
