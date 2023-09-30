import * as Dialog from "@radix-ui/react-dialog";
import { AiOutlineClose, AiOutlinePlusCircle } from "react-icons/ai";
import styles from "./styles.module.css";
import { Inter } from "next/font/google";
import CreateTaskForm from "@/components/forms/CreateTaskForm";
import { Task } from "@/app/tasks/page";
import { Dispatch, SetStateAction, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

interface CreateTaskDialogProps {
  setTasks: Dispatch<SetStateAction<Task[]>>;
  tasks: Task[];
}

export default function CreateTaskDialog({
  setTasks,
  tasks,
}: CreateTaskDialogProps) {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <Dialog.Root open={showDialog}>
      <Dialog.Trigger asChild>
        <AiOutlinePlusCircle
          style={{ cursor: "pointer" }}
          size={64}
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
              Criar Tarefa
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
          <CreateTaskForm
            setTasks={setTasks}
            tasks={tasks}
            setShowDialog={setShowDialog}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
