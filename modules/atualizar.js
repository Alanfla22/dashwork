
export function atualizarInputs (input) {

    console.log(input.files)
    const listFiles = input.files;
    var objectFiles = {};

    Object.values(listFiles).forEach((file) => {
        objectFiles[file.name] = URL.createObjectURL(file);
    })

    console.log(objectFiles);
    
    return objectFiles;

}