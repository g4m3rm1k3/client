import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends Component {
	componentDidMount() {
		window.gapi.load("client:auth2", () => {
			window.gapi.auth2
				.init({
					client_id:
						"144214535121-o5u3auv11kdeakobmm5dea450saj7mt9.apps.googleusercontent.com",
					scope: "email",
					plugin_name: "Streamy",
				})
				.then(() => {
					this.auth = window.gapi.auth2.getAuthInstance();
					this.onAuthChange(this.auth.isSignedIn.get());
					this.auth.isSignedIn.listen(this.onAuthChange);
				});
		});
	}
	onAuthChange = (isSignedIn) => {
		if (isSignedIn) {
			this.props.signIn(this.auth.currentUser.get().getId());
		} else {
			this.props.signOut();
		}
	};

	signIn = () => {
		this.auth.signIn();
	};
	signOut = () => {
		this.auth.signOut();
	};

	renderAuthButton() {
		if (this.props.isSignedIn === null) {
			return <div></div>;
		} else if (this.props.isSignedIn) {
			return (
				<button onClick={this.signOut} className="ui red google button">
					<i className="google icon" />
					Sign Out
				</button>
			);
		} else {
			return (
				<button onClick={this.signIn} className="ui red google button">
					<i className="google icon" />
					Sign In with Google
				</button>
			);
		}
	}

	render() {
		return <div>{this.renderAuthButton()}</div>;
	}
}

const mapStateToProps = (state, ownProps) => {
	return { isSignedIn: state.auth.isSignedIn };
};
export default connect(mapStateToProps, {
	signIn,
	signOut,
})(GoogleAuth);
