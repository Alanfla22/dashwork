const xSize = 400;
const ySize = 200;
const margin = 40;        
const xMax = xSize - margin*2;
const yMax = ySize - margin*2;        

const plotEvol = d3.select("#myevolution").append("svg");

export function lineSvg (dados) {
    
    plotEvol.selectAll("g").remove();

    const parseTime = d3.utcParse("%d/%m/%Y");

    const historico = [
        {"data":"10/06/2025", "total": 100, "dif": 20},
        {"data":"11/06/2025", "total": 120, "dif": -30},
        {"data":"12/06/2025", "total": 90, "dif": 5},
        {"data":"13/06/2025", "total": 95, "dif": 0}
    ];

    const svg = plotEvol.append("g").attr("transform","translate(" + margin + "," + margin + ")");

    console.log(historico[1]);
    
        // Titulo

    svg.append("g")
    .append("text")    
    .attr("x", 2)
    .attr("y", -10)
    .attr("font-size", 30)
    .text("Histórico")
    .attr('fill', "hsl(196 70 88)");


    // X Axis
    const xScale = d3.scaleTime()
                    .domain(d3.extent(historico, d => parseTime(d.data)))
                    .range([0, xSize]);

    
    svg.append("g")
    .attr("transform", "translate(0," + yMax + ")")
    .call(d3.axisBottom(xScale));

    // Y Axis
    const yScale = d3.scaleLinear()
    .domain([0, d3.max(historico, d => d.total)])
    .range([ yMax, 0])
    .nice();

    svg.append("g")
    .call(d3.axisLeft(yScale));

    // Dots
    svg.append('g')
    .selectAll("rect")
    .data(historico).enter()
    .append("rect")        
    .attr("x", d => xScale(parseTime(d.data)))
    .attr("y", d => d.dif < 0 ? yScale(d.total) : yScale(d.total + d.dif))
    .attr("width", 400 / 4)
    .attr("height", d => d.dif < 0 ? (yScale(d.total) - yScale(d.total - d.dif)) : (yScale(d.total) - yScale(d.total + d.dif)))
    .attr("fill", d => d.dif < 0 ? "hsl(196 70 28)" : "hsl(0 70 28)")
    .style("cursor", "pointer")
    .style("transition", "0.3s")
    .append("title")
    .text(d => "" + d.data + " - " + d.total + "");    
    
};

