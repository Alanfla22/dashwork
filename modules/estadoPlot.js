
const mapa = d3.select("#mapa");

export function estadoPlot (groupSuper, groupApdSuper) {

    mapa.selectAll(".super")
    .style("opacity", "1")
    .style("transition", "0.3s")
    .style("cursor", "pointer")
    .select("title").remove();

    const superList = mapa.selectAll(".super")._groups[0];

    const supersObject = {};

    superList.forEach((node) => {

        supersObject[node.id] = [];
        
    })  

    Object.keys(groupSuper).forEach((key) => {
        supersObject[key] = Object.values(supersObject[key]).concat(groupSuper[key])
    })

    Object.keys(groupApdSuper).forEach((key) => {
        supersObject[key] = Object.values(supersObject[key]).concat(groupApdSuper[key])
    })


    const maximo = d3.max(Object.values(supersObject), (d) => d.length);                
    

    superList.forEach((node) => {

        var nomeSuper = node.id;
        var quantidade = Object.values(supersObject[nomeSuper]).length;
        
        d3.select(node)
        .attr("fill", `hsl(196 70 ${Math.floor((98 * (quantidade)) / maximo)})`)
        .append("title")
        .text(nomeSuper + " - " + quantidade);
    })

}                
