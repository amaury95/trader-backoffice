import { gql, useMutation } from "@apollo/client";
import { Field, Form, Formik } from "formik";
import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { setSession, Store } from "store";
import { LoginMutation, LoginMutationVariables } from "types";

const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    session: login(email: $email, password: $password) {
      id
      name
      email
      edges {
        roles {
          value
        }
      }
    }
  }
`;

export default function LoginView() {
  const history = useHistory();
  const { dispatch } = useContext(Store);

  const [login] = useMutation<LoginMutation, LoginMutationVariables>(
    loginMutation
  );

  const handleSubmit = async (variables: LoginMutationVariables) => {
    const { data } = await login({ variables });

    if (data) {
      dispatch(setSession(data));
      history.push("/");
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
            <Field type="email" name="email" placeholder="email" />
          </div>
          <div>
            <Field type="password" name="password" placeholder="password" />
          </div>
          <button type="submit">submit</button>
        </Form>
      </Formik>
      <Link to="/session/register">Register</Link>
    </div>
  );
}
