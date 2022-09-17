import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import history from "../../history";
import { fetchStream, deleteStream } from "../../actions";

export class StreamDelete extends Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}
	actions = (
		<div className="actions">
			<button
				onClick={() => this.props.deleteStream(this.props.match.params.id)}
				className="ui negative button"
			>
				Delete
			</button>
			<Link to="/" className="ui button">
				Cancel
			</Link>
		</div>
	);
	render() {
		if (!this.props.stream) {
			return (
				<Modal
					title="Delete Stream"
					content="Are you sure you want to delete this stream?"
					actions={this.actions}
					onDismiss={() => history.push("/")}
				/>
			);
		}
		return (
			<Modal
				title={`Delete Stream:  ${this.props.stream.title}`}
				content="Are you sure you want to delete this stream?"
				actions={this.actions}
				onDismiss={() => history.push("/")}
			/>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	stream: state.streams[ownProps.match.params.id],
});

export default connect(mapStateToProps, { fetchStream, deleteStream })(
	StreamDelete
);
