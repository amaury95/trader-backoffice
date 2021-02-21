import { FunctionComponent } from "react";
import { Modal } from "semantic-ui-react";

export interface ModalFormProps {
  open: boolean;
  onClose: () => void;

  /** A modal can vary in size. */
  size?: "mini" | "tiny" | "small" | "large" | "fullscreen";
}

interface Actionable {
  header: string;
  actions: JSX.Element;
}

export const ModalForm: FunctionComponent<ModalFormProps & Actionable> = ({
  header,
  children,
  actions,
  ...props
}) => (
  <Modal
    {...props}
    closeIcon
    title="Close"
    dimmer="blurring"
    closeOnDimmerClick={false}
  >
    <Modal.Header>{header}</Modal.Header>
    <Modal.Content>{children}</Modal.Content>
    <Modal.Actions>{actions}</Modal.Actions>
  </Modal>
);
