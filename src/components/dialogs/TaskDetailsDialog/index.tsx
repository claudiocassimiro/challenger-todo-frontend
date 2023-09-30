import * as Dialog from "@radix-ui/react-dialog";
import { AiOutlineClose, AiFillEye } from "react-icons/ai";
import styles from "./styles.module.css";
import { Inter } from "next/font/google";
import { Task } from "@/app/tasks/page";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

interface TaskDetailsDialogProps {
  task: Task;
}

export default function TaskDetailsDialog({ task }: TaskDetailsDialogProps) {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <Dialog.Root open={showDialog}>
      <Dialog.Trigger asChild>
        <div
          className={styles.containerOpenDialogButton}
          onClick={() => setShowDialog(true)}
        >
          Detalhes da tarefa
          <AiFillEye
            style={{ cursor: "pointer" }}
            size={22}
            fill="#7E57C2"
            onClick={() => setShowDialog(true)}
          />
        </div>
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
              {task.title}
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
          <div className={styles.container}>
            <p
              className={styles.informationText}
            >{`Prioridade: ${task.priority}`}</p>
            <p
              className={styles.informationText}
            >{`Data para conclusão: ${new Date(
              task.completion_data
            ).toLocaleDateString("pt-BR")}`}</p>
          </div>
          <p className={styles.informationText}>Descrição:</p>
          <div className={styles.container}>
            <p className={styles.informationText}>{task.description}</p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
