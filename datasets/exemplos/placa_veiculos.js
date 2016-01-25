function createDataset(fields, constraints, sortFields) {
     
    //Cria as colunas
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("Placa");
    dataset.addColumn("Veiculo");
    dataset.addColumn("Motorista");
     
    //Cria a constraint para buscar os formulários ativos
    var cst = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
    var constraints = new Array(cst);
     
    var datasetPrincipal = DatasetFactory.getDataset("cad_veiculos", null, constraints, null);
     
    for (var i = 0; i < datasetPrincipal.rowsCount; i++) {
        var documentId = datasetPrincipal.getValue(i, "metadata#id");
        var documentVersion = datasetPrincipal.getValue(i, "metadata#version");
         
        //Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
        var c1 = DatasetFactory.createConstraint("tablename", "veiculos" ,"veiculos", ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
        var c3 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);
        var constraintsFilhos = new Array(c1, c2, c3);
 
        //Busca o dataset
        var datasetFilhos = DatasetFactory.getDataset("cad_veiculos", null, constraintsFilhos, null);
        log.info("<<< QUANTIDADE COLUNAS " + datasetFilhos.rowsCount)
        for (var j = 0; j < datasetFilhos.rowsCount; j++) {
            //Adiciona os valores nas colunas respectivamente.
            dataset.addRow(new Array(
                    datasetFilhos.getValue(j, "res_placa"),
                    datasetFilhos.getValue(j, "veiculo"), 
                    datasetFilhos.getValue(j, "motorista")));
        }
    }
     
    return dataset;
}