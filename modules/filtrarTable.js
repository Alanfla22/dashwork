import {tabulate} from "./tablePlot.js";

export function filtrarTable (dados, key, selecao) {

    const result = dados.filter((d) => d[key] == selecao);

    tabulate(result);
};