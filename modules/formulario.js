
const field = d3.select("#fieldData");
const fieldTarefa = d3.select("#fieldTarefa");
const fieldTipo = d3.select("#fieldTipo");
const fieldSuper = d3.select("#fieldSuper");

export function formulario (datas, tarefas, tipos, supers) {


    field.selectAll("input").remove();
    field.selectAll("label").remove();
    field.selectAll("br").remove();
    
    fieldTarefa.selectAll("input").remove();
    fieldTarefa.selectAll("label").remove();
    fieldTarefa.selectAll("br").remove();
    
    fieldTipo.selectAll("input").remove();
    fieldTipo.selectAll("label").remove();
    fieldTipo.selectAll("br").remove();

    fieldSuper.selectAll("input").remove();
    fieldSuper.selectAll("label").remove();
    fieldSuper.selectAll("br").remove();                      

    const datasArray = Array.from(datas);

    const parseTime = d3.utcParse("%d/%m/%Y");            
    datasArray.sort((a, b) => parseTime(a) - parseTime(b)); 

    datasArray.forEach((item) => {
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
   
    supers.forEach((item) => {
        fieldSuper.append("input")
        .attr("type", "checkbox")
        .attr("name", "Super")
        .attr("value", item);

        fieldSuper.append("label")
        .text(item);

        fieldSuper.append("br")
    })                          
    


}
