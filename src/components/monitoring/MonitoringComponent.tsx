import * as React from "react";

import {
  Container,
  Input,
  Text,
  Button,
  FormLabel,
  useToast,
  UseToastOptions,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { useFirebase } from "@/firebase/firebaseContext";

const toastSucessMessage: UseToastOptions = {
  title: "Operation was sucessful",
  description: "Sucess",
  status: "success",
  duration: 5000,
  isClosable: true,
};

const toastErrorMessage: UseToastOptions = {
  title: "Error",
  description: "There was an error",
  status: "error",
  duration: 5000,
  isClosable: true,
};

export function MonitoringComponentRegister() {
  const { functions } = useFirebase();
  const [monitoring, setMonitoring] = React.useState<string>("");
  const [monitoringErrorMessage, setMonitoringErrorMessage] =
    React.useState<string>("");
  const [monitoringList, setMonitoringList] = React.useState<string[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] =
    React.useState<boolean>(false);
  const toast = useToast();

  React.useEffect(() => {
    functions.readMonitoring().then((monitoringList) => {
      console.log(monitoringList);
      setMonitoringList(monitoringList);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleWriteMonitoring = () => {
    setIsButtonDisabled(true);

    setMonitoringErrorMessage("");
    if (!monitoring) setMonitoringErrorMessage("Please enter a task name");
    if (monitoring.length > 100)
      setMonitoringErrorMessage("Task name is too long");
    if (monitoring.length < 3)
      setMonitoringErrorMessage("Task name is too short");
    if (monitoringList.includes(monitoring))
      setMonitoringErrorMessage("Task name already exists");
    if (monitoringErrorMessage.length > 0) {
      setIsButtonDisabled(false);
      return;
    }

    functions
      .writeMonitoring(monitoring)
      .then(() => {
        setMonitoringList([...monitoringList, monitoring]);
        toast(toastSucessMessage);
      })
      .catch(() => {
        toast(toastErrorMessage);
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  return (
    <>
      <Container mt={20}>
        <Text variant="heading">Add a new task to monitor</Text>
        <Text variant="paragraph" textAlign="center">
          {" "}
          This will allow you to have more data on the tasks monitored in the
          Analysis tab{" "}
        </Text>

        <FormLabel mt={4} mb={0}>
          Monitoring Task Name
        </FormLabel>
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setMonitoring(e.target.value);
          }}
        />
        <Text fontSize="sm" color="red">
          {monitoringErrorMessage}
        </Text>
        <Flex flexDirection="column" alignItems="center">
          <Button
            mt={4}
            onClick={handleWriteMonitoring}
            isLoading={isButtonDisabled}
          >
            Add
          </Button>
        </Flex>

        <Text mt={6}>Tasks being currently monitored:</Text>
        {monitoringList.map((monitoring) => {
          return (
            <Flex key={monitoring} alignItems="center" padding="2">
              <Text fontSize="lg">• {monitoring}</Text>
              <IconButton
                aria-label="remove"
                icon={<Text>🗑️</Text>}
                ml={3}
                onClick={() => {
                  functions
                    .deleteMonitoring(monitoring)
                    .then(() => {
                      setMonitoringList(
                        monitoringList.filter((item) => item !== monitoring)
                      );
                      toast(toastSucessMessage);
                    })
                    .catch(() => {
                      toast(toastErrorMessage);
                    });
                }}
              />
            </Flex>
          );
        })}
      </Container>
    </>
  );
}
