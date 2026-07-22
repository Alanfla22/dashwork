
import {filtrarForm} from "./modules/filtrarForm.js";
import {atualizarInputs} from "./modules/atualizar.js";

const input = document.getElementById("myfile");

const form = document.getElementById("testForm");

input.addEventListener("change", () => {

    const inputs = atualizarInputs(input);
  
    filtrarForm([], inputs);

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        
        var filtros = [];
        for (var filtro of formData) {
            filtros.push(filtro);
        };
        
        filtrarForm(filtros, inputs);
    
    })    
    
})



//###########################################################

