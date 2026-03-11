use serde::{Deserialize, Serialize};
use std::env;

// GLM-5 API 요청/응답 구조체
#[derive(Serialize)]
struct GLMMessage {
    role: String,
    content: String,
}

#[derive(Serialize)]
struct GLMRequest {
    model: String,
    messages: Vec<GLMMessage>,
    temperature: f64,
    max_tokens: u32,
}

#[derive(Deserialize)]
struct GLMChoice {
    message: GLMResponseMessage,
}

#[derive(Deserialize)]
struct GLMResponseMessage {
    content: String,
}

#[derive(Deserialize)]
struct GLMUsage {
    prompt_tokens: u32,
    completion_tokens: u32,
    total_tokens: u32,
}

#[derive(Deserialize)]
struct GLMResponse {
    choices: Vec<GLMChoice>,
    usage: GLMUsage,
}

// 채팅 요청 명령
#[tauri::command]
async fn chat_with_glm(messages: Vec<GLMMessage>) -> Result<String, String> {
    // API 키 가져오기 (환경 변수 또는 하드코딩된 기본값)
    let api_key = env::var("GLM_API_KEY")
        .unwrap_or_else(|_| "YOUR_API_KEY_HERE".to_string());

    if api_key == "YOUR_API_KEY_HERE" {
        return Err("GLM_API_KEY가 설정되지 않았습니다. 환경 변수를 설정하세요.".to_string());
    }

    let client = reqwest::Client::new();

    let request = GLMRequest {
        model: "glm-5".to_string(),
        messages: messages.clone(),
        temperature: 0.7,
        max_tokens: 2000,
    };

    let response = client
        .post("https://coding-intl.dashscope.aliyuncs.com/v1/chat/completions")
        .header("Authorization", format!("Bearer {}", api_key))
        .header("Content-Type", "application/json")
        .json(&request)
        .send()
        .await
        .map_err(|e| format!("API 요청 실패: {}", e))?;

    if !response.status().is_success() {
        let status = response.status();
        let error_text = response.text().await.unwrap_or_else(|_| "Unknown error".to_string());
        return Err(format!("API 오류 {}: {}", status, error_text));
    }

    let glm_response: GLMResponse = response
        .json()
        .await
        .map_err(|e| format!("응답 파싱 실패: {}", e))?;

    if let Some(choice) = glm_response.choices.first() {
        Ok(choice.message.content.clone())
    } else {
        Err("응답에 메시지가 없습니다.".to_string())
    }
}

// 윈도우 위치 설정 명령
#[tauri::command]
async fn set_window_position(window: tauri::Window, x: i32, y: i32) -> Result<(), String> {
    window.set_position(tauri::Position::Physical(tauri::PhysicalPosition { x, y }))
        .map_err(|e| format!("윈도우 위치 설정 실패: {}", e))
}

// API 키 설정 명령
#[tauri::command]
async fn set_api_key(key: String) -> Result<(), String> {
    env::set_var("GLM_API_KEY", &key);
    Ok(())
}

// API 키 확인 명령
#[tauri::command]
async fn has_api_key() -> bool {
    env::var("GLM_API_KEY").is_ok() &&
    env::var("GLM_API_KEY").unwrap_or_default() != "YOUR_API_KEY_HERE"
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            chat_with_glm,
            set_window_position,
            set_api_key,
            has_api_key
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
