
var TableTrip = React.createClass({displayName: "TableTrip",
	render: function() {
		return(
			React.createElement("table", {class: "table"}, 
				React.createElement("tbody", null, 
					React.createElement("tr", null, 
						React.createElement("th", null, this.props.nameTrip)
					)
				)
			)
		);
	}
});

module.exports = TableTrip;
