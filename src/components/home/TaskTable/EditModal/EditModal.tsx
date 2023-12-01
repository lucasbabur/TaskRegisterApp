import * as React from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

import { useFirebase } from "@/firebase/firebaseContext";
import { useSignal } from "@preact/signals-react";

import { TaskRegistrationForm } from "@/config/forms/taskRegistrationForm";
import { TaskFormFieldsInterface } from "@/config/forms/taskRegistrationForm/interface";

export function EditModal(props: { uid: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let initialValuesObject = useSignal<TaskFormFieldsInterface | undefined>(
    undefined
  );

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const { functions } = useFirebase();

  const readInitialValues = () => {
    functions.readTaskByUID(props.uid).then((data) => {
      initialValuesObject.value = data;
    });
  };

  return (
    <>
      <Button
        backgroundColor={"#e5e6c9"}
        minWidth="10px"
        width="10px"
        height="30px"
        onClick={async () => {
          await readInitialValues();
          onOpen();
        }}
      >
        ✏️
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={() => {
          initialValuesObject.value = undefined;
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit a task</ModalHeader>
          {initialValuesObject.value && (
            <TaskRegistrationForm
              uid={props.uid}
              initialValuesObject={initialValuesObject.value}
              afterSubmitFunction={(task, setTaskDataState, taskDataState) => {
                let index = taskDataState.findIndex(
                  (item) => item.uid === task.uid
                );

                if (index !== -1) {
                  let copy = [...taskDataState];
                  copy[index] = task;

                  setTaskDataState(copy);
                }
                initialValuesObject.value = undefined;
                onClose();
              }}
            />
          )}

          <ModalCloseButton />
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}
