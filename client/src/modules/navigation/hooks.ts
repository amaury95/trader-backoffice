import { gql, useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Store } from "store";
import { LogoutMutation } from "types";

const logoutMutation = gql`
  mutation LogoutMutation {
    logout
  }
`;

export const useNavigationData = () => {
  const history = useHistory();
  const { pathname: path } = useLocation();

  const { state, dispatch } = useContext(Store);

  const [logout] = useMutation<LogoutMutation>(logoutMutation);

  const [isExpanded, setIsExpanded] = useState(false);

  return { history, path, state, dispatch, logout, isExpanded, setIsExpanded };
};

export const useFormsData = () => {
  const [showTransferForm, setShowTransferForm] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showDepositForm, setShowDepositForm] = useState(false);

  return {
    showTransferForm,
    setShowTransferForm,
    showDepositForm,
    setShowDepositForm,
    showIncomeForm,
    setShowIncomeForm,
  };
};
