import React from "react";
import ReactDOM from "react-dom";

function Modal(props) {
	return ReactDOM.createPortal(
		<div onClick={props.onDismiss} className="ui dimmer modals visible active">
			<div
				onClick={(e) => e.stopPropagation()}
				className="ui standard modal visible active"
			>
				<div className="header">{props.title}</div>
				<div className="content">{props.content}</div>
				{props.actions}
			</div>
		</div>,
		document.querySelector("#modal")
	);
}
export default Modal;
