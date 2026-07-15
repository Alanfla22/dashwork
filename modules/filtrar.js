export function filtrar (values, guarda, filtros) {

    const listGuarda = Object.keys((Object.groupBy(guarda, (item) => item["CLIENTE"])));
    
    if (filtros.length == 0) {

        values.forEach((item) => {
            item["Guarda"] = listGuarda.includes(item["Nome"]) ? "SIM" : "NAO";
        })
        
        return values;
    } else {

        var objeto = {};

        filtros.forEach((item) => {

            objeto[item[0]] = [];

        })

        filtros.forEach((item) => {

            objeto[item[0]] = Object.values(objeto[item[0]]).concat([item[1]]);

        })

        const selecoes = Object.entries(objeto);
        const quantidade = selecoes.length;

        const geral = [];

        values.forEach((item) => {
            var i = 0;
            selecoes.forEach((x) => {
                var variavel = item[x[0]];
                if (x[1].includes(variavel)) {
                    i = i + 1;                
                }

                if (i == quantidade) {
                    geral.push(item);
                }

            })        

        }) 

        geral.forEach((item) => {
            item["Guarda"] = listGuarda.includes(item["Nome"]) ? "SIM" : "NAO";
        })

        return geral; 

   }

};  
