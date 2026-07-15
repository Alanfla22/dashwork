export function filtrar (values, guarda, filtros) {

    const listGuarda = Object.keys((Object.groupBy(guarda, (item) => item["CLIENTE"])));
    
    if (filtros.length == 0) {

        values.forEach((item) => {
            item["Guarda"] = listGuarda.includes(item["Nome"]) ? "SIM" : "NAO";
        })
        
        return values;
    } else {

        var filtrosObject = {};

        filtros.forEach((item) => {

            if (!filtrosObject[item[0]]) {

                filtrosObject[item[0]] = [];
            }            

            filtrosObject[item[0]] = Object.values(filtrosObject[item[0]]).concat([item[1]]);

        })

        const selecoes = Object.entries(filtrosObject);
        const quantSelecoes = selecoes.length;
        const valuesFiltrados = [];

        values.forEach((item) => {
            var i = 0;
            selecoes.forEach((x) => {
                var variavel = item[x[0]];
                var filtro = x[1];
                if (filtro.includes(variavel)) {
                    i++;                
                }

                if (i == quantSelecoes) {
                    valuesFiltrados.push(item);
                }

            })        

        }) 

        valuesFiltrados.forEach((item) => {
            item["Guarda"] = listGuarda.includes(item["Nome"]) ? "SIM" : "NAO";
        })

        return valuesFiltrados; 


    }

};  
