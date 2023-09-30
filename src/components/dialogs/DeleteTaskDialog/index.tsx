"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

import axios from "axios";

import {
  Root,
  Trigger,
  Portal,
  Content,
  Close,
  Overlay,
} from "@radix-ui/react-dialog";

import styles from "./styles.module.css";
import { Task } from "@/app/tasks/page";

export interface DeleteTaskDialogProps {
  taskId: string;
  setTasks: Dispatch<SetStateAction<Task[]>>;
  tasks: Task[];
}

export default function DeleteTaskDialog({
  taskId,
  setTasks,
  tasks,
}: DeleteTaskDialogProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [deleteError, setDeleteError] = useState(``);

  const deletedFailed = () => {
    setDeleteError(`Falha ❌`);
    setTimeout(() => setDeleteError(``), 3000);
  };

  const deleteTaskOnClick = async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`
      );

      if (response.status === 204) {
        setTasks(tasks.filter((task) => task.id !== taskId));
        setShowDialog(false);
      }

      throw new Error();
    } catch {
      deletedFailed();
    }
  };

  return (
    <Root open={showDialog} onOpenChange={setShowDialog}>
      <Trigger
        type="button"
        className={styles.deleteTaskDialogTrigger}
        aria-label="Excluir Task"
      >
        <FaRegTrashAlt size={20} />
      </Trigger>
      <Portal>
        <Overlay className={styles.deleteTaskDialogOverlay} />
        <Content className={styles.deleteTaskDialogContent}>
          <p className={styles.deleteTaskDialogText}>
            Deseja realmente excluir esta task? Essa ação é
            <span> irreversível</span>.
          </p>
          <div className={styles.deleteTaskDialogButtons}>
            <button
              className={styles.deleteTaskDialogDelBtn}
              onClick={deleteTaskOnClick}
              type="button"
            >
              {deleteError || `Sim`}
            </button>
            <Close type="button" className={styles.deleteTaskDialogCancelBtn}>
              Não
            </Close>
          </div>
        </Content>
      </Portal>
    </Root>
  );
}
