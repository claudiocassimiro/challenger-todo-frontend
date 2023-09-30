import * as Dialog from "@radix-ui/react-dialog";
import { AiOutlineClose } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import styles from "./styles.module.css";
import { Inter } from "next/font/google";
import { Task } from "@/app/tasks/page";
import { Dispatch, SetStateAction, useState } from "react";
import UpdateTaskForm from "@/components/forms/UpdateTaskForm";

const inter = Inter({ subsets: ["latin"] });

interface UpdateTaskDialogProps {
  setTasks: Dispatch<SetStateAction<Task[]>>;
  tasks: Task[];
  taskToBeEdited: Task;
}

export default function UpdateTaskDialog({
  setTasks,
  tasks,
  taskToBeEdited,
}: UpdateTaskDialogProps) {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <Dialog.Root open={showDialog}>
      <Dialog.Trigger asChild>
        <MdEditSquare
          style={{ cursor: "pointer" }}
          size={22}
          fill="#7E57C2"
          onClick={() => setShowDialog(true)}
        />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className={styles.dialogOverlay}
          onClick={() => setShowDialog(false)}
        />
        <Dialog.Content className={styles.dialogContent}>
          <div className={styles.containerTitleAndCloseButton}>
            <Dialog.Title
              className={`${styles.dialogTitle}, ${inter.className}`}
              style={{ color: "#000" }}
            >
              Atualizar Tarefa
            </Dialog.Title>
            <Dialog.Close asChild>
              <AiOutlineClose
                style={{ cursor: "pointer" }}
                size={25}
                color="#000"
                onClick={() => setShowDialog(false)}
              />
            </Dialog.Close>
          </div>
          <UpdateTaskForm
            setTasks={setTasks}
            tasks={tasks}
            setShowDialog={setShowDialog}
            taskToBeEdited={taskToBeEdited}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
