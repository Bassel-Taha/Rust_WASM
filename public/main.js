async function init() {
const input = document.getElementById('upload')

//creating a variable to store the rustapp 
let rustapp = null

//using a try catch block to try getting the rustapp and if it fails, it will catch the error and log it to the console
try {
    rustapp = await import('../pkg')
    console.log(rustapp)
}
catch(e)
{
    //logging the error and returning to stop the execution of the function
console.log(e);
return;
}

// Create a new FileReader object that can read the file as string to pass the string to the rust files
let fileReader = new FileReader(); 

// When the file is loaded, remove the metadata of the file
fileReader.onloadend = ()=>{
    //the resault is encoded using base64 encoding 
    let base64File = fileReader.result

    //removing the metadata of the file
    let fileWithoutMetadata = fileReader.result.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
    console.log(fileWithoutMetadata);
}

if (input.files.length !== 0) {
//using the readAsDataURL method to read the file as a string with the base64 encoding to be easy for transfering the string to the rust files
input.addEventListener('change', ()=>{
    //using the readAsDataURL method to read the file as a string with the base64 encoding to be easy for transfering the string to the rust files
    fileReader.readAsDataURL(input.files[0])
})
}
}

init()