use image::codecs::png;
use wasm_bindgen::prelude::*;
use web_sys::console::log_1 ;
use base64::{decode , encode};
use image::{load_from_memory, DynamicImage};
use image::ImageFormat::Png;
use std::io::{Cursor, Read};

fn IsProcessing() -> bool
{
    return false;
}

//exporting the Gray_Scale function to the JS side of the code using the wasm_bindgen macro attribute
#[wasm_bindgen]
pub fn Gray_Scale(encoded_Image : &str) -> String
{
    //using the log function from the web_sys cargo package to export a console log function to the JS side of the code and print the resault 
    //adding the into function to convert the string to a JsValue as the log_1 finction takes a JsValue as an argument
    log_1(&"the GrayScale function is called".into());
    //decoding the base64 encoded image to a vector of bytes
    let decoded_Image = decode(&encoded_Image).unwrap();

    log_1(&"the image is decoded and logged to the console".into());
    //loading the image from the memory
    let mut img = load_from_memory(&decoded_Image).unwrap();
    log_1(&"the image is loaded from the memory".into());
    //converting the image to a grayscale image
    img = img.grayscale();
    log_1(&"the image is converted to a grayscale image".into());

    img = img.blur(5.0);
    log_1(&"the image is blurred".into());

    //converting the image to a vector of bytes
    //the new update if the image cargo pack need the cursor and seek to be mutable
    let mut buffer = Cursor::new(vec![]);
    img.write_to(&mut buffer, Png).unwrap();
    log_1(&"the image is written and created a new image with the demanded effects".into());

    //converting the final image in the buffer object of bytes to a base64 encoded string
    let final_Image_With_Effects =  encode(&mut buffer.get_ref());

    //adding the meta data to the string to be able to display the image in the HTML side of the code
    let final_Image_With_Effects = format!("data:image/png;base64,{}", final_Image_With_Effects);

    return final_Image_With_Effects;

}

