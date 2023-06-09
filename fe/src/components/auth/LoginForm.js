import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContexts } from "../../contexts/AuthContexts";
import Alert from "../layout/Alert";


const LoginForm = () => {
  // Context
  const { loginUser } = useContext(AuthContexts);

  // Router
  // const history = useNavigate();

  // Local Storage
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  // Alert Miss when Wrong Pass
  const [alert, setAlert] = useState(null);


  const { username, password } = loginForm;
  // Luu username, password khi nguoi dung nhap
  const onChangeLoginForm = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  // An Login button => Form submit
  const login = async (event) => {
    event.preventDefault(); // Tranh submit theo kieu form HTML

    try {
      const loginData = await loginUser(loginForm);
      if(loginData.success) {
        // history('/home'); // day di noi khac
        // Tuy nhien khong can do ham userLoad o AuthContexts da duoc goi o Auth.js
      } else{
        setAlert({type: 'danger', message: loginData.message});
        setTimeout(() => setAlert(null), 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Form onSubmit={login}>
      <Alert info={alert}/>
        <Form.Group className="mb-2 mt-4">
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Form.Group className="mb-2 mt-2">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Button className="btn btn-success mt-2" type="submit">
          Login
        </Button>
      </Form>
      <p className="mt-4">
        Don't have an account?
        <Link to="/register">
          <Button size="sm" className="btn btn-info ms-lg-2">
            Register
          </Button>
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
