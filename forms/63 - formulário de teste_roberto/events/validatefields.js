function validateForm(form) {		var activity = getValue('WKNumState');if ((form.getValue("combo2") == null || form.getValue("combo2") ==  "") && ( getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true') )) {throw "Combo 1 não pode ser vazio.";}}