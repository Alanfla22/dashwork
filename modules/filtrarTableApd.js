import {tabulateApd} from "./tableApdPlot.js";

export function filtrarTableApd (dados, key, selecao) {

    const result = dados.filter((d) => d[key] == selecao);

    tabulateApd(result);
};