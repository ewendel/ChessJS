define(function (require) {

	var columnNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

	
	// <2,5> into "H5" and vice versa
	function convert() {
		if (arguments.length === 2) {
			var col = arguments[0];
			var row = arguments[1];
			return columnNames[col] + row;
		} else {
			var path = arguments[0];
			for (var i=0 ; i < 8 ; i++) {
				if (path.substr(0,1) === columnNames[i]) {
					return {
						col: i,
						row: path.substr(1,2)
					};
				}
			}
		}
	};

	var Path = {
		convert: convert
	};


	return Path;

});