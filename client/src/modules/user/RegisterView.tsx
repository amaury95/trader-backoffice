import { gql, useMutation } from "@apollo/client";
import { Field, Form, Formik } from "formik";
import { Link, useHistory } from "react-router-dom";
import { RegisterMutation, RegisterMutationVariables } from "types";

const registerMutation = gql`
  mutation RegisterMutation(
    $email: String!
    $name: String!
    $password: String!
  ) {
    register(email: $email, name: $name, password: $password)
  }
`;

export default function RegisterView() {
  const history = useHistory();

  const [register] = useMutation<RegisterMutation, RegisterMutationVariables>(
    registerMutation
  );

  const handleSubmit = async (variables: any) => {
    if (variables.password !== variables.repeatPassword) {
      alert("passwords dont match");
      return;
    }

    const { data } = await register({ variables });

    if (data?.register) {
      history.push("/session");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <Formik
        initialValues={{
          email: "",
          name: "",
          password: "",
          repeatPassword: "",
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-input">
            <Field type="email" name="email" placeholder="Email" />
          </div>
          <div className="form-input">
            <Field type="name" name="name" placeholder="Full name" />
          </div>
          <div className="form-input">
            <Field type="password" name="password" placeholder="Password" />
          </div>
          <div className="form-input">
            <Field
              type="password"
              name="repeatPassword"
              placeholder="Repeat Password"
            />
          </div>
          <div className="form-input">
            <button type="submit">Submit</button>
          </div>
        </Form>
      </Formik>
      <Link to="/session">Login</Link>
    </div>
  );
}
