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

    const parseTime = d3.utcParse("%d/%m/%Y");

    const d = new Date();
    d.setDate(d.getDate() - 10);    

    historico.sort((a, b) => parseTime(a.data) - parseTime(b.data));

    historico.filter((item) => parseTime(item.data) > d); 
   
    historico.map((value, index, array) => {

        if (index < array.length - 1) {

            value.calc = array[index + 1].total - value.total;
            value.dias = parseTime(array[index + 1].data) - parseTime(value.data);

        }        
    })
    
    const intervalo = d3.max(historico, d => parseTime(d.data)) - d3.min(historico, d => parseTime(d.data));

    const svg = plotEvol.append("g")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .attr("transform", `translate(${margin.left}, ${margin.top})`);
            
    const xScale = d3.scaleTime()
                    .domain(d3.extent(historico, d => parseTime(d.data)))
                    .range([0, width]);

    const yScale = d3.scaleLinear()
                    .domain([0, d3.max(historico, d => d.total)])
                    .range([height, 0])
                    .nice();

    svg.append("g")
        .call(d3.axisLeft(yScale));
        
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale).tickValues([]));      

                        
    svg.append("g")
    .append("text")    
    .attr("x", 2)
    .attr("y", -5)
    .attr("font-size", 20)
    .text("Histórico")
    .attr('fill', "hsl(196 70 88)");
   
    svg.append('g')
    .selectAll("rect")
    .data(historico).enter()
    .append("rect")        
    .attr("x", d => xScale(parseTime(d.data)))
    .attr("y", d => d.calc < 0 ? yScale(d.total) : yScale(d.total + d.calc))
    .attr("width", d => d.dias * (width / intervalo) - 2)
    .attr("height", d => yScale(d.total) - yScale(d.total + Math.abs(d.calc)))
    .attr("fill", d => d.calc < 0 ? "hsl(196 70 88)" : "hsl(196 70 28)")
    .style("cursor", "pointer")
    .style("transition", "0.3s")
    .append("title")
    .text((d, i) => i < historico.length - 1 ? `${historico[i + 1].data} - ${d.total + d.calc}` : "");

}
