import { gql } from "@apollo/client";
import { ModalFormProps } from ".";

export const usersQuery = gql`
  query UsersQuery {
    users {
      id
      name
    }
  }
`;

export const TransferForm = (props: ModalFormProps) => {
  return <></>;
};
