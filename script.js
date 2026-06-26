
import {filtrarForm} from "./modules/filtrarForm.js";
import {atualizarInputs} from "./modules/atualizar.js";

const supers = [
    {Super: "SUPERINTENDENCIA ESTADUAL DO ESPIRITO SANTO"},
    {Super: "SUPERINTENDENCIA ESTADUAL DE MINAS GERAIS"},
    {Super: "SUPERINTENDENCIA ESTADUAL DO CEARA"},
    {Super: "SUPERINTENDENCIA ESTADUAL DO RIO GDE DO NORTE"},
    {Super: "SUPERINTENDENCIA ESTADUAL DO MARANHAO"},
    {Super: "SUPERINTENDENCIA ESTADUAL DO PIAUI"},
    {Super: "SUPERINTENDENCIA ESTADUAL DE ALAGOAS"},
    {Super: "SUPERINTENDENCIA ESTADUAL DE SERGIPE"},
    {Super: "SUPERINTENDENCIA ESTADUAL DA PARAIBA"},
    {Super: "SUPERINTENDENCIA ESTADUAL DE PERNAMBUCO"},
    {Super: "SUPERINTENDENCIA ESTADUAL DA BAHIA"}
];

d3.selectAll(".super")
.data(supers).enter();

d3.selectAll(".super")
.attr("fill", "hsl(196 70 28)")
.style("transition", "0.3s")
.style("cursor", "pointer")
.append("title")
.text((d) => d.Super);


const input = document.getElementById("myfile");

input.addEventListener("submit", () => {

    const inputs = atualizarInputs(input);
  
    filtrarForm([], inputs);

    testForm.onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(testForm);
        var listaForm = [];
        for (var obj of formData) {
            listaForm.push(obj);
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

        filtrarForm(listaForm, inputs);
    };

    d3.selectAll(".super")
    .on("click", function () {

        const selecao = d3.select(this)._groups[0][0].__data__;

        const filtro = [["Super", Object.values(selecao)[0]]];

        d3.select(".superselected")
        .attr("class", "super");

        d3.selectAll(".super")
        .style("opacity", "0.2");

        d3.select(this)
        .attr("class", "superselected")
        .style("opacity", "1");

        d3.select("#ufselected")
        .text(selecao.Super);            

        filtrarForm(filtro, inputs);


    });   

})

//###########################################################


