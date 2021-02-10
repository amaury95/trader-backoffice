import { gql, useMutation } from "@apollo/client";
import { Field, Form, Formik } from "formik";
import { Link, useHistory } from "react-router-dom";
import { RegisterMutation, RegisterMutationVariables } from "types";

const registerMutation = gql`
  mutation RegisterMutation($email: String!, $password: String!) {
    register(email: $email, password: $password)
  }
`;

export default function RegisterView() {
  const history = useHistory();

  const [register] = useMutation<RegisterMutation, RegisterMutationVariables>(
    registerMutation
  );

  const handleSubmit = async (variables: RegisterMutationVariables) => {
    const { data } = await register({ variables });
    if (data?.register) {
      history.push("/session");
    }
  };

  return (
    <div>
      <h2>Register</h2>
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
      <Link to="/session">Login</Link>
    </div>
  );
}
