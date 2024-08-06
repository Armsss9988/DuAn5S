import { Center, Button, AlertDialog } from "native-base";
import React from "react";

interface AlertContent {
  title: string;
  message: string;
  isOpen: boolean;
  onClose: () => void;
  onOk: () => void;
}
const CustomAlertDialog = ({
  title,
  message,
  isOpen,
  onClose,
  onOk,
}: AlertContent) => {
  const cancelRef = React.useRef(null);
  return (
    <Center>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>{title}</AlertDialog.Header>
          <AlertDialog.Body>{message}</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}
              >
                Cancel
              </Button>
              <Button
                colorScheme="danger"
                onPress={() => {
                  onOk();
                  onClose();
                }}
              >
                Ok
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};
export default CustomAlertDialog;
