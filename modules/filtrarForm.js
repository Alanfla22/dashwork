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
    
    const base = inputs.base;
    const baseapd = inputs.baseapd;
    const baseguarda = inputs.baseguarda;
    const basepaths = inputs.basepaths;
    const dataFiles = inputs.dataFiles;

    var dados = [];
    var dadosApd = [];

    var totalBase = 0;
    var totalBaseapd = 0;
    
    baseguarda.then((guarda) => {   

        base.then(       

            function (values) {
                
                dados = filtrar(values, guarda, filtros);
                
                totalBase = values.length;
                group = Object.keys(Object.groupBy(values, (item) => item["Data"]));
                groupTarefa = Object.keys(Object.groupBy(values, (item) => item["Tarefa"]));
                groupTipo = Object.keys(Object.groupBy(values, (item) => item["Tipo"]));
                groupSuper = Object.groupBy(dados, (item) => item["Super"]);

                const buttonTable = d3.select("#defaultOpen");
              
                histogramSvg(dados, dataFiles["base.csv"]);   
                pieSvg(dados, "Tipo");
                SelectpieSVG(dados);
                

                buttonTable.on("click", function () {
                    tabulate(dados, basepaths);
                    d3.select(this).style("background-color", "hsl(196 70 88)")
                    .style("color", "black");

                    d3.select("#apdOpen").style("background-color", "hsl(196 70 28)")
                    .style("color", "white");
                       
                })                 

                buttonTable.node().click();

                }
        );

        baseapd.then(

            function (values) {                

                dadosApd = filtrar(values, guarda, filtros);

                totalBaseapd = values.length;    
                groupApd = Object.keys(Object.groupBy(values, (item) => item["Data"]));
                groupApdTarefa = Object.keys(Object.groupBy(values, (item) => item["Tarefa"]));
                groupApdTipo = Object.keys(Object.groupBy(values, (item) => item["Tipo"]));                

                const datas = new Set(group.concat(groupApd));
                const tarefas = new Set(groupTarefa.concat(groupApdTarefa));
                const tipos = new Set(groupTipo.concat(groupApdTipo));              
                const total = totalBase + totalBaseapd;
                const data = d3.utcFormat("%d/%m/%Y")(new Date());
                const buttonTableApd = d3.select("#apdOpen"); 

                localStorage.setItem(data, total);

                formulario(datas, tarefas, tipos); 
                histogramApdSvg(dadosApd, dataFiles["baseapd.csv"]);
                pieapdSvg(dadosApd, "Tipo IC");
                SelectpieapdSVG(dadosApd);
                estadoPlot(dados, dadosApd);
                lineSvg();                

                buttonTableApd.on("click", function () {
                    tabulateApd(dadosApd, basepaths);
                    d3.select(this).style("background-color", "hsl(196 70 88)")
                    .style("color", "black");

                    d3.select("#defaultOpen").style("background-color", "hsl(196 70 28)")
                    .style("color", "white");
                       
                })                 
                

            }

        );
    }    
    );         

    
};



  
