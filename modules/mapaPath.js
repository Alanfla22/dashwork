export function munPath (dados, paths) {

    d3.select("#newpath").remove();

    d3.select("#mun")
    .text("_");
    
    d3.select("#uf")
    .text("_");    

    paths.then((path) => {

        path.forEach((d) => {

            var valores = Object.values(dados);

            var uf = dados["Super"];
            var mun = dados["Agencia"];

            var municipio = mun.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            var estado = uf.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            if ((municipio.indexOf(d["NM_MUN"].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) != -1) & ((estado.indexOf(d["NM_UF"].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) != -1) || (estado.indexOf("rio gde do norte")) != -1)) {

                d3.select("#mapa")
                .append("path")                
                .attr("d", d.PATH)
                .attr("fill", "red")
                .attr("id", "newpath");

                d3.select("#mun")
                .text(d["NM_MUN"]);
                
                d3.select("#uf")
                .text(d["NM_UF"]);    
           
        
            } 
        })

    })  

}

