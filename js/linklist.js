var LinkList =  React.createClass({displayName: "LinkList",
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
			React.createElement("a", {href: "javascript:void(0)", 
				onClick: this.handleTrip, 
				className: this.state.thisActive ? 'list-group-item active' : 'list-group-item', 
				"data-trip": this.props.numberLine}, 
				React.createElement("span", {className: "label label-primary"}, this.props.numberLine), this.props.nameLine
			)
		);
	}
});

module.exports = LinkList;