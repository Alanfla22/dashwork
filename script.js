
import {filtrarForm} from "./modules/filtrarForm.js";
import {atualizarInputs} from "./modules/atualizar.js";


const input = document.getElementById("myfile");

input.addEventListener("change", () => {

    const files = atualizarInputs(input);

    filtrarForm([], files);

    testForm.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(testForm);
    var listaForm = [];
    for (var obj of formData) {
        listaForm.push(obj);
    };

    filtrarForm(listaForm, files);
};


})





//###########################################################





















