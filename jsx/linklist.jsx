var LinkList =  React.createClass({
	getInitialState: function() {
		return {
			thisActive : false
		}
	},
	handleTrip: function(e,i) {
		// var thisTrip = e.target.data('trip');
		this.setState({
			thisActive: !this.state.thisActive
		});
		console.log(i);
	},
	render: function(){
		return(
			<a href="javascript:void(0)" 
				onClick={this.handleTrip} 
				className={this.state.thisActive ? 'list-group-item active' : 'list-group-item'} 
				data-trip={this.props.numberLine}>
				<span className="label label-primary">{this.props.numberLine}</span>{this.props.nameLine}
			</a>
		);
	}
});

module.exports = LinkList;