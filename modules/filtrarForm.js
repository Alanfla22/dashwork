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
import {formulario} from "./formulario.js"

export function filtrarForm (filtros, inputs) {

    var group = [];
    var groupApd = [];

    var groupTarefa = [];
    var groupApdTarefa = [];
    
    var groupTipo = [];
    var groupApdTipo = [];

    var groupSuper = [];
    var groupApdSuper = [];   
  
    
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
                
                const dados = filtrar(values, guarda, filtros);

                const buttonTable = d3.select("#defaultOpen");

                buttonTable.on("click", function () {
                    tabulate(dados, basepaths);
                    d3.select(this).style("background-color", "hsl(196 70 88)")
                    .style("color", "black");

                    d3.select("#apdOpen").style("background-color", "hsl(196 70 28)")
                    .style("color", "white");
                       
                }) 
                
                totalBase = values.length;
                group = Object.keys(Object.groupBy(values, (item) => item["Data"]));
                groupTarefa = Object.keys(Object.groupBy(values, (item) => item["Tarefa"]));
                groupTipo = Object.keys(Object.groupBy(values, (item) => item["Tipo"]));
                groupSuper = Object.groupBy(dados, (item) => item["Super"]);
              
                histogramSvg(dados, dataFiles["base.csv"]);   
                pieSvg(dados, "Tipo");
                SelectpieSVG(dados);

                buttonTable.node().click();

                }
        );

        baseapd.then(

            function (values) {                

                const dadosApd = filtrar(values, guarda, filtros);            
                const buttonTableApd = d3.select("#apdOpen");

                buttonTableApd.on("click", function () {
                    tabulateApd(dadosApd, basepaths);
                    d3.select(this).style("background-color", "hsl(196 70 88)")
                    .style("color", "black");

                    d3.select("#defaultOpen").style("background-color", "hsl(196 70 28)")
                    .style("color", "white");
                       
                })                 

                totalBaseapd = values.length;    
                groupApd = Object.keys(Object.groupBy(values, (item) => item["Data"]));
                groupApdTarefa = Object.keys(Object.groupBy(values, (item) => item["Tarefa"]));
                groupApdTipo = Object.keys(Object.groupBy(values, (item) => item["Tipo"]));
                groupApdSuper = Object.groupBy(dadosApd, (item) => item["Super"]);

                const datas = new Set(group.concat(groupApd));
                const tarefas = new Set(groupTarefa.concat(groupApdTarefa));
                const tipos = new Set(groupTipo.concat(groupApdTipo));              
                const total = totalBase + totalBaseapd;
                const data = d3.utcFormat("%d/%m/%Y")(new Date()); 

                localStorage.setItem(data, total);

                formulario(datas, tarefas, tipos); 
                histogramApdSvg(dadosApd, dataFiles["baseapd.csv"]);
                pieapdSvg(dadosApd, "Tipo IC");
                SelectpieapdSVG(dadosApd);
                estadoPlot(groupSuper, groupApdSuper);
                lineSvg();
                

            }

        );
    }    
    );         

    
};



  
