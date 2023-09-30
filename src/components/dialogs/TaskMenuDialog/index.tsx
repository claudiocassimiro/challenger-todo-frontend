import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CiMenuKebab } from "react-icons/ci";
import styles from "./styles.module.css";
import UpdateTaskDialog from "../UpdateTaskDialog";
import { Dispatch, SetStateAction } from "react";
import { Task } from "@/app/tasks/page";
import DeleteTaskDialog from "../DeleteTaskDialog";

interface TaskMenuDialogProps {
  setTasks: Dispatch<SetStateAction<Task[]>>;
  tasks: Task[];
  taskToBeEdited: Task;
  taskId: string;
}

const TaskMenuDialog = ({
  setTasks,
  tasks,
  taskToBeEdited,
  taskId,
}: TaskMenuDialogProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={styles.iconButton} aria-label="Customise options">
          <CiMenuKebab />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={styles.dropdownMenuContent}
          sideOffset={5}
        >
          <UpdateTaskDialog
            setTasks={setTasks}
            tasks={tasks}
            taskToBeEdited={taskToBeEdited}
          />

          <DeleteTaskDialog taskId={taskId} setTasks={setTasks} tasks={tasks} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default TaskMenuDialog;
