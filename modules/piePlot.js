import {filtrarTable} from "./filtrarTable.js";


const xSize = 500;
const ySize = 345;
const margin = 40;        
const xMax = xSize - margin*2;
const yMax = ySize - margin*2;
const radius = Math.min(xMax, yMax) / 2;    

const piePlot = d3.select("#mypie").append("svg");

export function pieSvg (dados, option) {  
    
        piePlot.selectAll("g").remove();

        const svg = piePlot.append("g").attr("transform",`translate(${xSize / 2}, ${ySize / 2})`);

        const result = Object.groupBy(dados, (item) => item[option]);
        const dadosHist = Object.entries(result);

        const pie = d3.pie().value(d => d[1].length);

        const arc = d3.arc().innerRadius(0).outerRadius(radius - 10);

        const n = pie(dadosHist).length;

        const con = Math.floor(100 / (n + 1));

        var paleta = [];

        for (var i = 0; i < n; i++) {
            var dir = 100 - (con * (i + 1));
            paleta.push(`hsl(196 70 ${dir})`);

        };

        const color = d3.scaleOrdinal().domain(dadosHist.map(d => d[0])).range(paleta);

        // Legend

        const legend = svg.append('g').attr("transform", `translate(160, 0)`)

        legend.selectAll('rect')
        .data(pie(dadosHist)).enter()
        .append('rect')
        .attr("x", 0)
        .attr("y", (d,i) => (i * 35) - 130)
        .attr("width", 30)
        .attr("height", 30)
        .attr("fill", d => color(d.data[0]))
        .on("mouseover", function () {
            d3.select(this).attr("fill", "hsl(196 70 88)");
              
        })
        .on("mouseout", function () {
   
            d3.select(this).attr("fill", d => color(d.data[0]));
        })
        .on("click", function () {
            const selecao = d3.select(this)._groups[0][0].__data__.data[0];
            filtrarTable(dados, option, selecao);
        })        ;

        legend.selectAll('text')
        .data(pie(dadosHist)).enter()
        .append('text')
        .attr('x', 32)
        .attr('y', (d,i) => (i * 35) - 110)
        .attr('font-size', 13)
        .attr('fill', "white") 
        .text(d =>  `${d.data[0]}`);  
        
        

    
        // Fatias
        svg.append('g')
        .selectAll("path")
        .data(pie(dadosHist)).enter()
        .append("path")        
        .attr("d", arc)
        .attr("fill", d => color(d.data[0]))
        .on("mouseover", function () {
            d3.select(this).attr("fill", "hsl(196 70 88)");
              
        })
        .on("mouseout", function () {
   
            d3.select(this).attr("fill", d => color(d.data[0]));
        })
        .on("click", function () {
            const selecao = d3.select(this)._groups[0][0].__data__.data[0];
            filtrarTable(dados, option, selecao);
        })
        .append("title")
        .text(d => "" + d.data[0] + " - " + d.data[1].length + "");

        

        
    };

export function SelectpieSVG(dados) {

    const selector = d3.select("#mypieSelector");

    selector.on("change", () => {
        
        const option = selector._groups[0][0].value;

        pieSvg(dados, option);})};



    
