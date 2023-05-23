import { Component } from "react";
import { signUp } from "../../utilities/users-service";
import  "./SignUpForm.css";

export default class SignUpForm extends Component {
  // form Data
  state = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    eror: "",
  };
  // allows user to type into the field (update state value)
  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: "",
    });
  };
  // submits form data and creates user
  handleSubmit = async (evt) => {
    evt.preventDefault(); // prevents page refresh
    try {
      const formData = { ...this.state };
      delete formData.confirm; // removes confirm & error properties in formData
      delete formData.error;

      const user = await signUp(formData); // user signs up (refer to utilities/users-service/users-api)
      this.props.setUser(user); // updates user state
    } catch (error) {
      this.setState({ error: "Sign Up Failed - Try Again" });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div>
        <div className="form-container">
          <form
            autoComplete="off"
            onSubmit={this.handleSubmit}
            className="sign-up-form"
          >
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
            <label>Confirm</label>
            <input
              type="password"
              name="confirm"
              value={this.state.confirm}
              onChange={this.handleChange}
              required
            />
            <button class="auth-btn" type="submit" disabled={disable}>
              SIGN UP
            </button>
          </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}
