
const mapa = d3.select("#mapa");

export function estadoPlot (groupSuper, groupApdSuper) {

    mapa.selectAll(".super")
    .style("transition", "0.3s")
    .style("cursor", "pointer")
    .select("title").remove();

    const noteList = mapa.selectAll(".super")._groups[0];

    const supersObject = {};

    for (var i = 0; i < noteList.length; i++) {

        supersObject[noteList[i].id] = [];
        
    }  

    Object.keys(groupSuper).forEach((key) => {
        supersObject[key] = Object.values(supersObject[key]).concat(groupSuper[key])
    })

    Object.keys(groupApdSuper).forEach((key) => {
        supersObject[key] = Object.values(supersObject[key]).concat(groupApdSuper[key])
    })


    const maximo = d3.max(Object.values(supersObject), (d) => d.length);                
    

    for (var i = 0; i < noteList.length; i++) {

        var nomeSuper = noteList[i].id;
        var quantidade = Object.values(supersObject[nomeSuper]).length;
        
        d3.select(noteList[i])
        .attr("fill", `hsl(196 70 ${Math.floor((98 * (quantidade)) / maximo)})`)
        .append("title")
        .text("estado");
    }

}                
