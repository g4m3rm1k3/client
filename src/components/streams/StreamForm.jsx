import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

export class StreamForm extends Component {
	renderInput(formProps) {
		const className = `field ${
			formProps.meta.error && formProps.meta.touched ? "error" : ""
		}`;
		return (
			<div className={className}>
				<label>
					*{formProps.label}
					<input {...formProps.input} autoComplete="off" />
					{formProps.meta.touched && (
						<div className={"floating mini "}>
							<p className={"message error ui mini"}></p>
							{formProps.meta.error}
						</div>
					)}
				</label>
			</div>
		);
	}

	onSubmit = (formValues) => {
		this.props.onSubmit(formValues);
	};

	render() {
		return (
			<form
				onSubmit={this.props.handleSubmit(this.onSubmit)}
				className="ui form error"
			>
				<Field name="title" component={this.renderInput} label="Enter Title" />
				<Field
					name="description"
					component={this.renderInput}
					label="Enter Description"
				/>
				<button className="ui primary button">Submit</button>
			</form>
		);
	}
}

const validate = (formValues) => {
	const errors = {};
	if (!formValues.title) {
		// only ran if the user did not enter a title
		errors.title = "You must enter a title";
	}
	if (!formValues.description) {
		errors.description = "You must enter a description";
	}
	return errors;
};

export default reduxForm({ form: "streamForm", validate })(StreamForm);
