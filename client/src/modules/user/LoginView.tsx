import { gql, useMutation } from "@apollo/client";
import { Field, Form, Formik } from "formik";
import { Link, useHistory } from "react-router-dom";
import { LoginMutation, LoginMutationVariables } from "types";

const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`;

export default function LoginView() {
  const history = useHistory();

  const [login] = useMutation<LoginMutation, LoginMutationVariables>(
    loginMutation
  );

  const handleSubmit = async (variables: LoginMutationVariables) => {
    const { data } = await login({ variables });
    if (data) {
      alert("user registered");
      history.push("/dashboard");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <Field type="email" name="email" />
          </div>
          <div>
            <Field type="password" name="password" />
          </div>
          <button type="submit">submit</button>
        </Form>
      </Formik>
      <Link to="/session/register">Register</Link>
    </div>
  );
}
