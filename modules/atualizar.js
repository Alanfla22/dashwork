
export function atualizarInputs (input) {

    const listFiles = input.files;
    var objectFiles = {};
    var dataFiles = {};

    Object.values(listFiles).forEach((file) => {
        objectFiles[file.name] = URL.createObjectURL(file);
        dataFiles[file.name] = file.lastModifiedDate.toLocaleString();        
        
    })

    const base = d3.dsv(";", objectFiles["base.csv"]).then(data => {


            var dados = [];

            data.forEach((item) => { 
                
                if ((item.Tarefa == "Validar Resolu��o das Ocorr�ncias de Instru��o") || (item.Tarefa == "Registrar Ocorr�ncias de Instru��o" || item.Tarefa == "Registrar Ocorr�ncias de Instru��o(Retorno)")) {

                    item.Data = item[data.columns[9]].split(" ")[0]
                    item.Tipo = item["Tipo Solicita��o"];
                    item.Super = item["Nome Superintendencia"];
                    item.Agencia = item["Nome Ag�ncia"];                    
                    dados.push(item);

                };               
                
            });
            
            return dados;
        
        });

    const baseapd = d3.dsv(";", objectFiles["baseapd.csv"]).then(data => {


            var dados = [];

            data.forEach((item) => {
                
                item.Data = item["Data de Cria��o"];
                item.Nome = item["Nome Cliente"];
                item.Tarefa = item["Situa��o"];
                item.Super = item["Superintend�ncia"].split("-")[1];
                item.Agencia = item["Ag�ncia"].split("-")[1];             
                item.Tipo = item["Tipo IC"];
                dados.push(item);
                
            });
            
            return dados;
        
        });
        

    const baseguarda = d3.dsv(";", objectFiles["guarda.csv"]).then(data => {


           
            return data;
        
        });

    const basepaths = d3.dsv(",", objectFiles["BNB_Paths.csv"]).then(data => {


            return data;
        
        });          

    return {
        "base": base,
        "baseapd": baseapd,
        "baseguarda": baseguarda,
        "basepaths": basepaths,
        "dataFiles": dataFiles
    }

}       


