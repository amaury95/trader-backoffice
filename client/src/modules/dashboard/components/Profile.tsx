import { gql, useMutation } from "@apollo/client";
import { ModalFormProps, useModalForm } from "components/ModalForm";
import { WithRoles } from "components/WithRoles";
import { Field, Form, Formik } from "formik";
import { Button, Input, Modal } from "semantic-ui-react";

import { AccountQuery_account, EditProfile, EditProfileVariables } from "types";

const profileMutation = gql`
  mutation EditProfile($id: ID!, $name: String, $avatar: String, $fee: Float) {
    profile(id: $id, name: $name, avatar: $avatar, fee: $fee) {
      id
      name
      avatar
      fee
    }
  }
`;

export interface ProfileViewProps {
  account: AccountQuery_account;
}

export default function ProfileView({ account }: ProfileViewProps) {
  const [avatarForm, showAvatarForm, closeAvatarForm] = useModalForm();
  const [nameForm, showNameForm, closeNameForm] = useModalForm();
  const [feeForm, showFeeForm, closeFeeForm] = useModalForm();

  const { id, username, avatar, name, email, balance, fee } = account;

  return (
    <div>
      <WithRoles roles={["admin"]}>
        <FeeForm
          account={account}
          fee={fee}
          open={feeForm}
          onClose={closeFeeForm}
        />
      </WithRoles>
      <WithRoles own={id} roles={["investor", "accountant", "admin"]}>
        <NameForm
          account={account}
          name={name}
          open={nameForm}
          onClose={closeNameForm}
        />
      </WithRoles>
      <ul>
        <li>id: {id}</li>
        <li>username: {username}</li>
        <li>
          avatar: {avatar}{" "}
          <WithRoles own={id} roles={["investor", "accountant", "admin"]}>
            <button onClick={showAvatarForm}>edit</button>
          </WithRoles>
        </li>
        <li>
          name: {name}{" "}
          <WithRoles own={id} roles={["investor", "accountant", "admin"]}>
            <button onClick={showNameForm}>edit</button>
          </WithRoles>
        </li>
        <li>email: {email}</li>
        <li>balance: {balance}</li>
        <li>
          fee: {fee}{" "}
          <WithRoles roles={["admin"]}>
            <button onClick={showFeeForm}>edit</button>
          </WithRoles>
        </li>
      </ul>
    </div>
  );
}

interface FeeFormProps extends ModalFormProps, ProfileViewProps {
  fee: number;
}

const FeeForm = ({ account: { id }, fee, ...props }: FeeFormProps) => {
  const [mutate] = useMutation<EditProfile, EditProfileVariables>(
    profileMutation
  );

  const handleSubmit = async (values: EditProfileVariables) => {
    const { id, fee } = values;
    const response = await mutate({ variables: { id, fee } });
    console.log(response);
    props.onClose();
  };

  return (
    <Modal {...props} size="mini">
      <Modal.Content>
        <Formik<EditProfileVariables>
          initialValues={{ id, fee }}
          onSubmit={handleSubmit}
        >
          <Form className="ui form">
            <Input action>
              <Field type="number" name="fee" min="0" max="1" step="0.01" />
              <Button type="submit" color="teal">
                Update Fee
              </Button>
            </Input>
          </Form>
        </Formik>
      </Modal.Content>
    </Modal>
  );
};

interface NameFormProps extends ModalFormProps, ProfileViewProps {
  name: string;
}

const NameForm = ({ account: { id }, name, ...props }: NameFormProps) => {
  const [mutate] = useMutation<EditProfile, EditProfileVariables>(
    profileMutation
  );

  const handleSubmit = async (values: EditProfileVariables) => {
    const { id, name } = values;
    const response = await mutate({ variables: { id, name } });
    console.log(response);
    props.onClose();
  };

  return (
    <Modal {...props} size="mini">
      <Modal.Content>
        <Formik<EditProfileVariables>
          initialValues={{ id, name }}
          onSubmit={handleSubmit}
        >
          <Form className="ui form">
            <Input action>
              <Field name="name" />
              <Button type="submit">Update Name</Button>
            </Input>
          </Form>
        </Formik>
      </Modal.Content>
    </Modal>
  );
};
