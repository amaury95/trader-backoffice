import { gql, useMutation } from "@apollo/client";
import { Form, Formik, Field } from "formik";
import React from "react";
import { ProfileViewProps } from "../Profile";
import { ProfileMutation, ProfileMutationVariables } from "types";
import { Button, Form as Input } from "semantic-ui-react";
import { WithRoles } from "components/WithRoles";

const profileMutation = gql`
  mutation ProfileMutation(
    $id: ID!
    $name: String
    $avatar: String
    $fee: Float
  ) {
    profile(id: $id, name: $name, avatar: $avatar, fee: $fee) {
      id
      name
      avatar
      fee
    }
  }
`;

export default function EditProfile({ account }: ProfileViewProps) {
  const [editProfile] = useMutation<ProfileMutation, ProfileMutationVariables>(
    profileMutation
  );

  const handleSubmit = async (variables: ProfileMutationVariables) => {
    const result = await editProfile({ variables });
    console.log({ result });
  };

  return (
    <Formik<ProfileMutationVariables>
      initialValues={account}
      onSubmit={handleSubmit}
    >
      <Form className="ui form">
        <WithRoles roles={["admin", "accountant", "investor"]} own={account.id}>
          <Input.Field>
            <label>Name</label>
            <Field name="name" />
          </Input.Field>
        </WithRoles>

        <WithRoles roles={["admin"]}>
          <Input.Field>
            <label>Fee</label>
            <Field name="fee" type="number" min="0" max="1" step="0.01" />
          </Input.Field>
        </WithRoles>

        <Button type="submit" color="blue">
          Update
        </Button>
      </Form>
    </Formik>
  );
}
