var X = XLSX;
function to_json(workbook) {
	var result = {};
	workbook.SheetNames.forEach(function(sheetName) {
		var roa = X.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);		
		if(roa.length > 0){
			result[sheetName] = roa;
		}		
	});
	return result;
}
function process_wb(wb) {	
	var  output = to_json(wb);
	return output;
}
