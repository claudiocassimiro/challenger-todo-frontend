"use client";

import Image from "next/image";
import { Inter } from "next/font/google";

import {
  Main,
  Header,
  H1,
  Section,
  Div,
  P,
  ContainerTask,
  ContainerCompleteCheckBoxAndTaskInfo,
  CheckBox,
  H2,
  TaskP,
  ContainerImageAndTaskInfos,
} from "./tasksStyles";

import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import CreateTaskDialog from "@/components/dialogs/CreateTaskDialog";
import TaskMenuDialog from "@/components/dialogs/TaskMenuDialog";

const inter = Inter({ subsets: ["latin"] });

export type Task = {
  id: string;
  title: string;
  description: string;
  completion_data: string;
  priority: string;
  creation_data: string;
};

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { isAuthenticated, token } = useAuth();
  const { push } = useRouter();

  if (!isAuthenticated) {
    push("/login");
  }

  useEffect(() => {
    try {
      const getTasks = async () => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/tasks`
        );

        const { data } = response;
        setTasks(data);
      };
      if (isAuthenticated) {
        getTasks();
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <Main>
      <Header>
        <H1 className={inter.className}>Tarefas</H1>
      </Header>
      <Section>
        <Div>
          {tasks.length > 0 ? (
            tasks.map((task) => {
              return (
                <ContainerTask key={task?.id}>
                  <ContainerCompleteCheckBoxAndTaskInfo>
                    <CheckBox type="checkbox" />
                    <div>
                      <H2 className={inter.className}>{task?.title}</H2>
                      {task?.completion_data ? (
                        <TaskP className={inter.className}>
                          {`${new Date(
                            task?.completion_data
                          ).toLocaleDateString("pt-BR")}`}
                        </TaskP>
                      ) : null}
                    </div>
                  </ContainerCompleteCheckBoxAndTaskInfo>
                  <div>
                    <TaskMenuDialog
                      setTasks={setTasks}
                      taskId={task.id}
                      tasks={tasks}
                      taskToBeEdited={task}
                    />
                  </div>
                </ContainerTask>
              );
            })
          ) : (
            <ContainerImageAndTaskInfos>
              <Image
                src="/team-checklist-cuate.svg"
                alt="Pessoas marcando uma checklist"
                width={227}
                height={227}
                priority
              />
              <P className={inter.className}>O que você quer fazer hoje?</P>
              <P className={inter.className}>
                Aperte no + para adicionar suas Trefas
              </P>
            </ContainerImageAndTaskInfos>
          )}
        </Div>
        <CreateTaskDialog setTasks={setTasks} tasks={tasks} />
      </Section>
    </Main>
  );
}
