import {pieSvg} from "./piePlot.js";
import {pieapdSvg} from "./pieapdPlot.js";
import {SelectpieapdSVG} from "./pieapdPlot.js";
import {SelectpieSVG} from "./piePlot.js";
import {histogramSvg} from "./histPlot.js";
import {histogramApdSvg} from "./histapdPlot.js";
import {estadoPlot} from "./estadoPlot.js";
import {lineSvg} from "./evolucaoPlot.js";
import {tabulate} from "./tablePlot.js";
import {tabulateApd} from "./tableApdPlot.js";
import {filtrar} from "./filtrar.js";

export function filtrarForm (filtros, inputs) {

    var group = [];
    var groupApd = [];

    var groupTarefa = [];
    var groupApdTarefa = [];
    
    var groupTipo = [];
    var groupApdTipo = [];

    var groupSuper = [];
    var groupApdSuper = [];

    var demandaSuper = [];
    var demandaApdSuper = [];
    
    const field = d3.select("#fieldData");
    const fieldTarefa = d3.select("#fieldTarefa");
    const fieldTipo = d3.select("#fieldTipo");
    const fieldSuper = d3.select("#fieldSuper");

    field.selectAll("input").remove();
    field.selectAll("label").remove();
    field.selectAll("br").remove();
    
    fieldTarefa.selectAll("input").remove();
    fieldTarefa.selectAll("label").remove();
    fieldTarefa.selectAll("br").remove();
    
    fieldTipo.selectAll("input").remove();
    fieldTipo.selectAll("label").remove();
    fieldTipo.selectAll("br").remove();

    fieldSuper.selectAll("input").remove();
    fieldSuper.selectAll("label").remove();
    fieldSuper.selectAll("br").remove();    
    
    const base = inputs.base;
    const baseapd = inputs.baseapd;
    const baseguarda = inputs.baseguarda;
    const basepaths = inputs.basepaths;
    const dataFiles = inputs.dataFiles;

    var totalBase = 0;
    var totalBaseapd = 0;
    
    baseguarda.then((guarda) => {   

        base.then(       

            function (values) {

                totalBase = values.length;

                const dados = filtrar(values, guarda, filtros);

                const buttonTable = d3.select("#defaultOpen");

                buttonTable.on("click", function () {
                    tabulate(dados, basepaths);
                    d3.select(this).style("background-color", "hsl(196 70 88)")
                    .style("color", "black");

                    d3.select("#apdOpen").style("background-color", "hsl(196 70 28)")
                    .style("color", "white");
                       
                }) 
                
                group = Object.keys(Object.groupBy(values, (item) => item["Data"]));
                groupTarefa = Object.keys(Object.groupBy(values, (item) => item["Tarefa"]));
                groupTipo = Object.keys(Object.groupBy(values, (item) => item["Tipo"]));               
                groupSuper = Object.keys(Object.groupBy(values, (item) => item["Super"]));
                demandaSuper = Object.groupBy(dados, (item) => item["Super"]);
              
                histogramSvg(dados);   
                pieSvg(dados, "Tipo");
                SelectpieSVG(dados);

                buttonTable.node().click();

                }
        );

        baseapd.then(

            function (values) {

                totalBaseapd = values.length;
                
                const dadosApd = filtrar(values, guarda, filtros);            
                const buttonTableApd = d3.select("#apdOpen");

                buttonTableApd.on("click", function () {
                    tabulateApd(dadosApd, basepaths);
                    d3.select(this).style("background-color", "hsl(196 70 88)")
                    .style("color", "black");

                    d3.select("#defaultOpen").style("background-color", "hsl(196 70 28)")
                    .style("color", "white");
                       
                })                 

                groupApd = Object.keys(Object.groupBy(values, (item) => item["Data"]));
                groupApdTarefa = Object.keys(Object.groupBy(values, (item) => item["Tarefa"]));
                groupApdTipo = Object.keys(Object.groupBy(values, (item) => item["Tipo"]));
                groupApdSuper = Object.keys(Object.groupBy(values, (item) => item["Super"]));
                demandaApdSuper = Object.groupBy(dadosApd, (item) => item["Super"]);
                

                const datas = new Set(group.concat(groupApd));
                const tarefas = new Set(groupTarefa.concat(groupApdTarefa));
                const tipos = new Set(groupTipo.concat(groupApdTipo));
                const supers = new Set(groupSuper.concat(groupApdSuper));
                
                const datasArray = Array.from(datas);

                const parseTime = d3.utcParse("%d/%m/%Y");            
                datasArray.sort((a, b) => parseTime(a) - parseTime(b)); 

                datasArray.forEach((item) => {
                    field.append("input")
                    .attr("type", "checkbox")
                    .attr("name", "Data")
                    .attr("value", item);

                    field.append("label")
                    .text(item);

                    field.append("br")
                })

                tarefas.forEach((item) => {
                    fieldTarefa.append("input")
                    .attr("type", "checkbox")
                    .attr("name", "Tarefa")
                    .attr("value", item);

                    fieldTarefa.append("label")
                    .text(item);

                    fieldTarefa.append("br")
                })
                
                tipos.forEach((item) => {
                    fieldTipo.append("input")
                    .attr("type", "checkbox")
                    .attr("name", "Tipo")
                    .attr("value", item);

                    fieldTipo.append("label")
                    .text(item);

                    fieldTipo.append("br")
                })

                supers.forEach((item) => {
                    fieldSuper.append("input")
                    .attr("type", "checkbox")
                    .attr("name", "Super")
                    .attr("value", item);

                    fieldSuper.append("label")
                    .text(item);

                    fieldSuper.append("br")
                }) 

                const total = totalBase + totalBaseapd;
                const data = d3.utcFormat("%d/%m/%Y")(new Date()); 

                localStorage.setItem(data, total);

                histogramApdSvg(dadosApd);
                pieapdSvg(dadosApd, "Tipo IC");
                SelectpieapdSVG(dadosApd);
                estadoPlot(demandaSuper, demandaApdSuper);
                lineSvg();
                

            }

        );
    }    
    );         

    
};



  
