function init() {
const input = document.getElementById('upload')

// Create a new FileReader object that can read the file as string to pass the string to the rust files
let fileReader = new FileReader(); 

// When the file is loaded, remove the metadata of the file
fileReader.onloadend = ()=>{
    //the resault is encoded using base64 encoding 
    let base64File = fileReader.result
    console.log(base64File)
    console.log(input.files[0]);

    //removing the metadata of the file
    let fileWithoutMetadata = fileReader.result.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
    console.log(fileWithoutMetadata);
}

input.addEventListener("change", ()=>{

    //using the readAsDataURL method to read the file as a string with the base64 encoding to be easy for transfering the string to the rust files
    fileReader.readAsDataURL(input.files[0])
    

})

}

init()