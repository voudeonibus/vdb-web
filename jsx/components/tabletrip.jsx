
var TableTrip = React.createClass({
	render: function() {
		return(
			<table class="table">
				<tbody>
					<tr>
						<th>{this.props.nameTrip}</th>
					</tr>
				</tbody>
			</table>
		);
	}
});

module.exports = TableTrip;
