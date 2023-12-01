import * as React from "react";

import { Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

import { useFirebase } from "@/firebase/firebaseContext";
import { useTasks } from "../../../generalAbstractions/taskContext/TaskContext";

export function RemoveButton(props: { uid: string }) {
  const { taskDataState, setTaskDataState } = useTasks();
  const toast = useToast();
  const { functions } = useFirebase();

  return (
    <Button
      backgroundColor={"#e5e6c9"}
      minWidth="10px"
      width="10px"
      height="30px"
      marginLeft="10px"
      onClick={() => {
        try {
          functions.removeTask(props.uid);
          let newTaskData = [...taskDataState];
          newTaskData = newTaskData.filter((item) => item.uid !== props.uid);
          setTaskDataState(newTaskData);

          toast({
            title: "Task removed.",
            description: "Task removed sucessfuly.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        } catch (error) {
          toast({
            title: "Task not removed.",
            description: "Task was not removed. A problem occurred.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      }}
    >
      ❌
    </Button>
  );
}
