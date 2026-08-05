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
import {munPath, munPathDefault} from "./mapaPath.js";
import {buttonApd, buttonS522} from "./buttons.js";

export function filtrarForm (filtros, inputs) {

    const base = inputs.base;
    const baseapd = inputs.baseapd;
    const baseguarda = inputs.baseguarda;
    const basepaths = inputs.basepaths;
    const dataFiles = inputs.dataFiles;
    
    var group = [];
    var groupApd = [];

    var groupTarefa = [];
    var groupApdTarefa = [];
    
    var groupTipo = [];
    var groupApdTipo = [];

    var groupSuper = [];
    var groupApdSuper = [];

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
                groupSuper = Object.keys(Object.groupBy(values, (item) => item["Super"]));
              
                histogramSvg(dados, dataFiles["base.csv"]);   
                pieSvg(dados, "Tipo");
                SelectpieSVG(dados);
                buttonS522(dados, basepaths);                

                }
        );

        baseapd.then(

            function (values) {                

                dadosApd = filtrar(values, guarda, filtros);

                totalBaseapd = values.length;    
                groupApd = Object.keys(Object.groupBy(values, (item) => item["Data"]));
                groupApdTarefa = Object.keys(Object.groupBy(values, (item) => item["Tarefa"]));
                groupApdTipo = Object.keys(Object.groupBy(values, (item) => item["Tipo"]));
                groupApdSuper = Object.keys(Object.groupBy(values, (item) => item["Super"]));                

                const datas = new Set(group.concat(groupApd));
                const tarefas = new Set(groupTarefa.concat(groupApdTarefa));
                const tipos = new Set(groupTipo.concat(groupApdTipo));
                const supers = new Set(groupSuper.concat(groupApdSuper));

                const totalBa = undefined;

                if ((totalBa != undefined) & (totalBaseapd != undefined)) {
                    const data = d3.utcFormat("%d/%m/%Y")(new Date());
                    const total = totalBase + totalBaseapd;
                    localStorage.setItem(data, total);
                } else {
                    alert("Reinicie para atualizar o histórico.")
                }    
                
                histogramApdSvg(dadosApd, dataFiles["baseapd.csv"]);
                pieapdSvg(dadosApd, "Tipo IC");
                SelectpieapdSVG(dadosApd);                
                buttonApd(dadosApd, basepaths);

                formulario(datas, tarefas, tipos, supers); 
                estadoPlot(dados, dadosApd);               
                munPathDefault();
                lineSvg();

            }

        );
    }    
    );         

    
};



  
