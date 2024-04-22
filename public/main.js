async function init() {

    let isProcessing = false;
    const input = document.getElementById('upload')

    //creating a variable to store the rustapp 
    let rustapp = null

    //using a try catch block to try getting the rustapp and if it fails, it will catch the error and log it to the console
    try {
        rustapp = await import('../pkg')
        console.log(rustapp)
    }
    catch (e) {
        //logging the error and returning to stop the execution of the function
        console.log(e);
        return;
    }

    // Create a new FileReader object that can read the file as string to pass the string to the rust files
    let fileReader = new FileReader();

    // When the input changes, read the file
    input.addEventListener('change', () => {
        if (input.files.length == 0) {
            return;
        }

        //using the readAsDataURL method to read the file as a string with the base64 encoding to be easy for transfering the string to the rust files
        fileReader.readAsDataURL(input.files[0])
    })

    // When the file is loaded, remove the metadata of the file
    fileReader.onloadend = () => {
        //changing the isProcessing variable to true to prevent the user from uploading another file while the current file is being processed
        isProcessing = true;
        if(isProcessing = true){
            input.disabled = true;
        }

        //the resault is encoded using base64 encoding 
        let base64File = fileReader.result
        //removing the metadata of the file
        let fileWithoutMetadata = fileReader.result.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");

        //calling the rustapp module to call th ecompiled functions in the rust files
        let finalImageDataURL = rustapp.Gray_Scale(fileWithoutMetadata);
        //displaying the image retruned from rust in the image tag in the dom using the base64 encoding as the browser can display the image using the base64 encoding
        let imageTag = document.getElementById("new-img").setAttribute(
            "src", finalImageDataURL
        )
        isProcessing = false;
        input.disabled = false;
    }
}

init()