
var TableTrip = React.createClass({
	render: function() {
		return(
				<table class="table">
					<tr>
						<th>{this.props.nameTrip}</th>
					</tr>
				</table>
			);
	}
});

module.exports = TableTrip;