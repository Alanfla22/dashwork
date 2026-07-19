import {tabulate} from "./tablePlot.js";
import {tabulateApd} from "./tableApdPlot.js";

const buttonTable = d3.select("#defaultOpen");
const buttonTableApd = d3.select("#apdOpen"); 

export function buttonS522(dados, basepaths) {

    buttonTable.on("click", function () {
        tabulate(dados, basepaths);
        d3.select(this).style("background-color", "hsl(196 70 88)")
        .style("color", "black");

        d3.select("#apdOpen").style("background-color", "hsl(196 70 28)")
        .style("color", "white");
            
    })
    
    buttonTable.node().click();   

}                

export function buttonApd(dadosApd, basepaths) {

    buttonTableApd.on("click", function () {
        tabulateApd(dadosApd, basepaths);
        d3.select(this).style("background-color", "hsl(196 70 88)")
        .style("color", "black");

        d3.select("#defaultOpen").style("background-color", "hsl(196 70 28)")
        .style("color", "white");
            
    })

}



