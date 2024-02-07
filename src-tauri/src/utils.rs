use window_shadows::{set_shadow, Error};

// set_shadow to the window (Windows and MacOS only)
pub fn _set_shadow_to_window(window: &tauri::Window) -> Result<(), Error> {
    if cfg!(any(windows, target_os = "macos")) {
        set_shadow(window, true)?;
    }
    Ok(())
}
