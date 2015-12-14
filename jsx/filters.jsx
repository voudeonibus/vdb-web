var Filters = React.createClass({
	handleChange: function(e){
		// change state searchString
		var filterInput = e.target.value;
		this.props.updateFilter(filterInput);
	},
	render: function() {
		// console.log(this.state.searchString)
		return (
			<div>
				<input className="form-control" type="text" onChange={this.handleChange} value={this.props.placeString} placeholder="Procure aqui" />
			</div>
		)}
	});
module.exports = Filters;