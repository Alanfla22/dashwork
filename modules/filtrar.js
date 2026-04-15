function filtrarItem (item, keysFiltro) {
    var obj = {};
    keysFiltro.forEach((key) => {
        obj[key] = item[key]
    });

    return new Set(Object.values(obj));
};

export function filtrar (values, guarda, filtros) {

    const valoresFiltro = new Set();
    const keysFiltro = new Set();

    filtros.forEach((filtro) => {
        
        keysFiltro.add(filtro[0]);
        valoresFiltro.add(filtro[1]);
    });

    var result = [];

    values.forEach((item) => {

        var A = filtrarItem(item, keysFiltro);
        var B = valoresFiltro;

        if (A.isSubsetOf(B)) {
            result.push(item);
        };

    });

    const listGuarda = Object.keys((Object.groupBy(guarda, (item) => item["CLIENTE"])));

    result.forEach((item) => {
        item["Guarda"] = listGuarda.includes(item["Nome"]) ? "SIM" : "NAO";
    })


    return result;
};  