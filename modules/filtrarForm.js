import {pieSvg} from "./piePlot.js";
import {pieapdSvg} from "./pieapdPlot.js";
import {SelectpieapdSVG} from "./pieapdPlot.js";
import {SelectpieSVG} from "./piePlot.js";
import {histogramSvg} from "./histPlot.js";
import {histogramApdSvg} from "./histapdPlot.js";
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
    
    var groupGuarda = [];
    var groupApdGuarda = [];        

    const field = d3.select("#fieldData");
    const fieldTarefa = d3.select("#fieldTarefa");
    const fieldTipo = d3.select("#fieldTipo");
    const fieldGuarda = d3.select("#fieldGuarda");    

    field.selectAll("input").remove();
    field.selectAll("label").remove();
    field.selectAll("br").remove();
    
    fieldTarefa.selectAll("input").remove();
    fieldTarefa.selectAll("label").remove();
    fieldTarefa.selectAll("br").remove();
    
    fieldTipo.selectAll("input").remove();
    fieldTipo.selectAll("label").remove();
    fieldTipo.selectAll("br").remove();
    
    const base = d3.dsv(";", inputs["base.csv"]).then(data => {


            var dados = [];

            data.forEach((item) => {
                
                if ((item.Tarefa == "Validar Resolu��o das Ocorr�ncias de Instru��o") || (item.Tarefa == "Registrar Ocorr�ncias de Instru��o")) {

                    item.Data = item[data.columns[9]].split(" ")[0]
                    item.Tipo = item["Tipo Solicita��o"];
                    dados.push(item);

                };               
                
            });
            
            return dados;
        
        });
        

    const baseapd = d3.dsv(";", inputs["baseapd.csv"]).then(data => {


            var dados = [];

            data.forEach((item) => {
                
                item.Data = item["Data de Cria��o"];
                item.Nome = item["Nome Cliente"];
                item.Tarefa = item["Situa��o"];
                item.Tipo = item["Tipo IC"];
                dados.push(item);
                
            });
            
            return dados;
        
        });
        

    const baseguarda = d3.dsv(";", inputs["guarda.csv"]).then(data => {


            var dados = [];

            data.forEach((item) => {

                dados.push(item);
                
            });
            
            return dados;
        
        });        
    
    baseguarda.then((guarda) => {   

        base.then(       

            function (values) {
                const dados = filtrar(values, guarda, filtros);

                const buttonTable = d3.select("#defaultOpen");

                buttonTable.on("click", function () {
                    tabulate(dados);
                    d3.select(this).style("background-color", "hsl(196 70 88)")
                    .style("color", "black");

                    d3.select("#apdOpen").style("background-color", "hsl(196 70 28)")
                    .style("color", "white");
                       
                }) 
                
                group = Object.keys(Object.groupBy(values, (item) => item["Data"]));
                groupTarefa = Object.keys(Object.groupBy(values, (item) => item["Tarefa"]));
                groupTipo = Object.keys(Object.groupBy(values, (item) => item["Tipo"]));
                
                histogramSvg(dados);   
                pieSvg(dados, "Tipo")
                SelectpieSVG(dados);

                buttonTable.node().click();

                }
        );

        baseapd.then(

            function (values) {

                const dadosApd = filtrar(values, guarda, filtros);            
                const buttonTableApd = d3.select("#apdOpen");

                buttonTableApd.on("click", function () {
                    tabulateApd(dadosApd);
                    d3.select(this).style("background-color", "hsl(196 70 88)")
                    .style("color", "black");

                    d3.select("#defaultOpen").style("background-color", "hsl(196 70 28)")
                    .style("color", "white");
                       
                })                 

                groupApd = Object.keys(Object.groupBy(values, (item) => item["Data"]));
                groupApdTarefa = Object.keys(Object.groupBy(values, (item) => item["Tarefa"]));
                groupApdTipo = Object.keys(Object.groupBy(values, (item) => item["Tipo"]));

                const datas = new Set(group.concat(groupApd));
                const tarefas = new Set(groupTarefa.concat(groupApdTarefa));
                const tipos = new Set(groupTipo.concat(groupApdTipo));
                const guardas = new Set(groupGuarda.concat(groupApdGuarda));

                

                datas.forEach((item) => {
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

                histogramApdSvg(dadosApd);
                pieapdSvg(dadosApd, "Tipo IC");
                SelectpieapdSVG(dadosApd);

            }

        );
    }    
    );

    
};



  
