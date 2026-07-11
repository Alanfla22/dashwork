
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

        d3.select(".superselected")
        .attr("class", "super");

        d3.selectAll(".super")
        .style("opacity", "1");

        d3.select("#newpath").remove();

        d3.select("#mun")
        .text("_");
        
        d3.select("#uf")
        .text("_");

        d3.select("#ufselected")
        .text(" ");        

        filtrarForm(filtros, inputs);
    });

    d3.selectAll(".super")
    .on("click", function () {

        const selecao = d3.select(this)._groups[0][0].id;

        const filtro = [["Super", selecao]];

        d3.select(".superselected")
        .attr("class", "super");

        d3.selectAll(".super")
        .style("opacity", "0.2");

        d3.select(this)
        .attr("class", "superselected")
        .style("opacity", "1");

        d3.select("#ufselected")
        .text(selecao);            

        filtrarForm(filtro, inputs);


    });   

})

//###########################################################

