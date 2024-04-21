use wasm_bindgen::prelude::*;
use web_sys::console::log_1 ;

//exporting the Gray_Scale function to the JS side of the code using the wasm_bindgen macro attribute
#[wasm_bindgen]
pub fn Gray_Scale(encoded_Image : &str)
{
    //using the log function from the web_sys cargo package to export a console log function to the JS side of the code and print the resault 
    //adding the into function to convert the string to a JsValue as the log_1 finction takes a JsValue as an argument
    log_1(&encoded_Image.into());
}