
import {filtrarTable} from "./filtrarTable.js";

const xSize = 500;
const ySize = 400;
const margin = 40;        
const xMax = xSize - margin*2;
const yMax = ySize - margin*2;        

const plotHist = d3.select("#myhist").append("svg");

export function histogramSvg (dados) {
    
    plotHist.selectAll("g").remove();
    
    dados.sort((a, b) => new Date(a.Data) - new Date(b.Data));
    const result = Object.groupBy(dados, ({ Data }) => Data);
    const dadosHist = Object.entries(result);

    const svg = plotHist.append("g").attr("transform","translate(" + margin + "," + margin + ")");

    // Sort array
    
        // Titulo

    svg.append("g")
    .append("text")    
    .attr("x", 2)
    .attr("y", -10)
    .attr("font-size", 30)
    .text(`Estoque S522: ${dados.length}`)
    .attr('fill', "white");

    // X Axis
    const xScale = d3.scaleBand()
    .domain(dadosHist.map(d => d[0]))
    .range([0, xMax])
    .padding(0.1);
    
    svg.append("g")
    .attr("transform", "translate(0," + yMax + ")")
    .call(d3.axisBottom(xScale));

    const dataList = [];
    dadosHist.forEach((d) => {
        dataList.push(d[0]);
    });

    // Y Axis
    const yScale = d3.scaleLinear()
    .domain([0, d3.max(dadosHist, d => d[1].length)])
    .range([ yMax, 0])
    .nice();

    svg.append("g")
    .call(d3.axisLeft(yScale));

    // Dots
    svg.append('g')
    .selectAll("rect")
    .data(dadosHist).enter()
    .append("rect")        
    .attr("x", d => xScale(d[0]))
    .attr("y", yMax)
    .attr("width", xScale.bandwidth())
    .attr("height", 0)
    .attr("fill", "hsl(196 70 28)")
    .call(enter => enter.transition()
        .duration(750)
        .attr("y", d => yScale(d[1].length))
        .attr("height", d => yMax - yScale(d[1].length)
        )
    )
    .on("mouseover", function () {
        d3.select(this).attr("fill", "hsl(196 70 88)");               
    })
    .on("mouseout", function () {
        d3.select(this).attr("fill","hsl(196 70 28)");   
    })
    .on("click", function () {
                    const selecao = d3.select(this)._groups[0][0].__data__[0];
                    filtrarTable(dados, "Data", selecao);

                })
    .append("title")
    .text(d => "" + d[0] + " - " + d[1].length + "");    
    
};
