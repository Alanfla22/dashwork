
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
.data(supers).enter()
.style("cursor", "pointer");


const input = document.getElementById("myfile");

input.addEventListener("change", () => {

    const objectFiles = atualizarInputs(input);

    console.log(objectFiles);

    filtrarForm([], objectFiles);

    testForm.onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(testForm);
        var listaForm = [];
        for (var obj of formData) {
            listaForm.push(obj);
        };

        d3.select(".superselected")
        .attr("class", "super")
        .attr("fill", "hsl(196 70 28)");

        d3.select("#newpath").remove();

        d3.select("#mun")
        .text("_");
        
        d3.select("#uf")
        .text("_");

        d3.select("#ufselected")
        .text(" ");        

        filtrarForm(listaForm, objectFiles);
    };

    d3.selectAll(".super")
    .attr("fill", "hsl(196 70 28)")
    .style("transition", "0.3s")
    .on("click", function () {

        const selecao = d3.select(this)._groups[0][0].__data__;

        d3.select(".superselected")
        .attr("class", "super")
        .attr("fill", "hsl(196 70 28)");

        d3.select(this)
        .attr("class", "superselected")
        .attr("fill", "hsl(196 70 88)");

        d3.select("#ufselected")
        .text(selecao.Super);            

        filtrarForm([["Super", Object.values(selecao)[0]]], objectFiles);


    })
    .append("title")
    .text((d) => d.Super);    

})

//###########################################################




















