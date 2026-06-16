const width = 450, height = 130, margin = {top:20, right:20, bottom:40, left:40};

const plotEvol = d3.select("#myevolution").append("svg");

export function lineSvg () {
    
    plotEvol.selectAll("g").remove();

    var historico = [];

    for ( var [datum, valor] of Object.entries(localStorage)) {

        var objeto = {
            "data": datum,
            "total": parseInt(valor)
        }

        historico.push(objeto);                    

    }

    const svg = plotEvol.append("g")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .attr("transform", `translate(${margin.left}, ${margin.top})`);
            
    const xScale = d3.scaleTime()
                    .domain(d3.extent(historico, d => d3.utcParse("%d/%m/%Y")(d.data)))
                    .range([0, width]);

    const yScale = d3.scaleLinear()
                    .domain([0, d3.max(historico, d => d.total)])
                    .range([height, 0])
                    .nice();

    const line = d3.line()
                    .x(d => xScale(d3.utcParse("%d/%m/%Y")(d.data)))
                    .y(d => yScale(d.total));

                        
    svg.append("g")
    .append("text")    
    .attr("x", 2)
    .attr("y", -5)
    .attr("font-size", 20)
    .text("Histórico")
    .attr('fill', "hsl(196 70 88)");

    svg.append("path")
        .datum(historico)
        .attr("fill", "none")
        .attr("stroke", "hsl(196 70 28)")
        .attr("stroke-width", 2)
        .attr("d", line);

        
    svg.selectAll("circle")
        .data(historico).enter()
        .append("circle")
        .attr("cx", d => xScale(d3.utcParse("%d/%m/%Y")(d.data)))
        .attr("cy", d => yScale(d.total))
        .attr("r", 5)
        .attr("fill", "hsl(196 70 88)")
        .style("cursor", "pointer")
        .append("title")
        .text(d => "" + d.data + " - " + d.total + "");                

    svg.append("g")
        .call(d3.axisLeft(yScale));
        
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale).tickValues([]));   

}        
