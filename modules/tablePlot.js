
const columns = ["Data", "Nome", "Tipo", "Tarefa", "Dono", "Guarda"];

const table = d3.select("#mytable");            

export function tabulate(dados) {

    table.select("thead").remove();
    table.select("tbody").remove();

    var thead = table.append("thead");

    var tbody = table.append("tbody");

    // rows to thead

    thead.append("tr")
    .selectAll("th")
    .data(columns).enter()
    .append("th")
    .text(d => d);

    // rows to data

    var rows = tbody.selectAll("tr")
    .data(dados)
    .enter()
    .append("tr")
    .style("background-color", "hsl(217, 33, 17)");


    // cell i each row

    var cells = rows.selectAll("td")
    .data(function (row) {
        return columns.map(function (column) {
            return {column: column, value: row[column]};
        })
    })
    .enter()
    .append("td")
    .on("mouseover", function () {
                d3.select(this.parentNode).style("background-color", "hsl(196 70 88)");
     
            })
    .on("mouseout", function () {
                d3.select(this.parentNode).style("background-color", "hsl(217, 33, 17)");  

            })
    .text(d => d.value);

    d3.select("#defaultOpen").style("background-color", "hsl(196 70 88)")
    .style("color", "black");

    d3.select("#apdOpen").style("background-color", "hsl(196 70 28)")
    .style("color", "white");    
    


};
