import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}
	onSubmit = (formValues) => {
		console.log(this.props);
		this.props.editStream(this.props.stream.id, formValues);
	};

	render() {
		if (!this.props.stream) {
			return <div>Loading...</div>;
		}
		return (
			<div>
				<h3>Edit a stream</h3>
				<StreamForm
					initialValues={_.pick(this.props.stream, "title", "description")}
					onSubmit={this.onSubmit}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	stream: state.streams[ownProps.match.params.id],
});

export default connect(mapStateToProps, { fetchStream, editStream })(
	StreamEdit
);
