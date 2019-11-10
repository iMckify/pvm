import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { registerUser } from '../../actions/authentication';
import {
  emailValidation,
  passwordValidation,
  confirmPasswordValidation,
  isEmpty
} from '../../utils/validation';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
      disable: true
    };
  }

  validate = (e, method) => {
    this.setState({ [`${e.target.name}Error`]: method(e.target.value) });
  };

  confirmPasswordValidate = (e, method) => {
    const { password } = this.state;
    this.setState({
      [`${e.target.name}Error`]: method(e.target.value, password)
    });
  };

  buttonDisable = () => {
    const { email, password, confirmPassword } = this.state;
    if (!isEmpty(email) && !isEmpty(password) && !isEmpty(confirmPassword)) {
      this.setState({ disable: false });
    } else {
      this.setState({ disable: true });
    }
  };

  handleChange = e => {
    this.setState({ [`${e.target.name}Error`]: '' });
    this.setState({ [e.target.name]: e.target.value }, () => this.buttonDisable());
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password, emailError, passwordError, confirmPasswordError } = this.state;
    const { openSnackbar, setError, switchWindow } = this.props;
    const userData = {
      email,
      password
    };
    if (isEmpty(emailError) && isEmpty(passwordError) && isEmpty(confirmPasswordError)) {
      registerUser(userData, openSnackbar, setError, switchWindow);
    }
  };

  render() {
    const {
      email,
      password,
      confirmPassword,
      emailError,
      passwordError,
      confirmPasswordError,
      disable
    } = this.state;
    const { classes } = this.props;

    const labelNames = {
      email: 'email',
      password: 'password',
      confirmPassword: 'confirmPassword'
    };

    return (
      <form onSubmit={this.handleSubmit} className={classes.layout}>
        <TextField
          className={classes.textFields}
          name={labelNames.email}
          label="Email"
          type={labelNames.email}
          value={email}
          error={!isEmpty(emailError)}
          onChange={this.handleChange}
          onBlur={e => this.validate(e, emailValidation)}
          helperText={emailError}
          margin="normal"
        />
        <TextField
          className={classes.textFields}
          name={labelNames.password}
          label="Password"
          type={labelNames.password}
          value={password}
          error={!isEmpty(passwordError)}
          onChange={this.handleChange}
          onBlur={e => this.validate(e, passwordValidation)}
          helperText={passwordError}
          margin="normal"
        />
        <TextField
          className={classes.textFields}
          name={labelNames.confirmPassword}
          label="Confirm Password"
          type={labelNames.password}
          value={confirmPassword}
          error={!isEmpty(confirmPasswordError)}
          onChange={this.handleChange}
          onBlur={e => this.confirmPasswordValidate(e, confirmPasswordValidation)}
          helperText={confirmPasswordError}
          margin="normal"
        />
        <div />
        <Button className={classes.button} disabled={disable} variant="outlined" type="submit">
          Sign up
        </Button>
      </form>
    );
  }
}

Form.propTypes = {
  openSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired,
  setError: PropTypes.func.isRequired,
  switchWindow: PropTypes.func.isRequired
};

export default Form;
