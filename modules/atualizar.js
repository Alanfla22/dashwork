
export function atualizarInputs (input) {

    const listFiles = input.files;
    var objectFiles = {};

    Object.values(listFiles).forEach((file) => {
        objectFiles[file.name] = URL.createObjectURL(file);
    })

   
    return objectFiles;

}
