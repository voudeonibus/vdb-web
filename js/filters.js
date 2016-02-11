var busTripAction = require('./busTripAction').actions;

var Filters = React.createClass({displayName: "Filters",
	handleChange: function(e){
		// change state searchString
		var filterInput = e.target.value;
		this.props.updateFilter(filterInput);
		busTripAction.searchLine(filterInput);
	},
	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement("input", {className: "form-control", type: "text", onChange: this.handleChange, value: this.props.placeString, placeholder: "Procure aqui"})
			)
		)}
	});
module.exports = Filters;