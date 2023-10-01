"use client";

import { useForm, SubmitHandler } from "react-hook-form";

import { Inter } from "next/font/google";

import {
  Form,
  Input,
  TextArea,
  Select,
  Label,
  Span,
  Button,
} from "./updateTaskForm";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { Task } from "@/app/tasks/page";

type Inputs = {
  title: string;
  description: string;
  completion_data: Date;
  priority: string;
};

const inter = Inter({ subsets: ["latin"] });

interface UpdateTaskFormProps {
  setTasks: Dispatch<SetStateAction<Task[]>>;
  tasks: Task[];
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  taskToBeEdited: Task;
}

export default function UpdateTaskForm({
  setTasks,
  tasks,
  setShowDialog,
  taskToBeEdited,
}: UpdateTaskFormProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const { token } = useAuth();
  const { register, handleSubmit, reset } = useForm<Inputs>({
    defaultValues: {
      title: taskToBeEdited.title,
      description: taskToBeEdited.description,
      priority: taskToBeEdited.priority,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const parsedData = {
      ...formData,
      id: taskToBeEdited.id,
      priority: formData.priority.toLowerCase(),
    };

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
        parsedData
      );

      const { data } = response;
      const updatedTasks = tasks.map((task) => {
        if (task.id === taskToBeEdited.id) {
          return { ...data.updatedTask };
        }

        return { ...task };
      });

      setTasks(updatedTasks);
      setShowDialog(false);

      reset();
    } catch (error) {
      setErrorMessage("Ops... Aconteceu algum problema, tente novamente!");
      setTimeout(() => {
        setErrorMessage("");
      }, 3500);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Label className={inter.className} htmlFor="title">
        Título da tarefa
        <Input
          id="title"
          type="text"
          placeholder="Digite o título da tarefa"
          {...register("title")}
        />
      </Label>

      <Label className={inter.className} htmlFor="description">
        Escreva uma descrição para sua tarefa
        <TextArea
          id="description"
          rows={3}
          placeholder="Digite seu email"
          {...register("description")}
        />
      </Label>

      <Label className={inter.className} htmlFor="completion_data">
        Data esperada para conclusão
        <Input
          id="completion_data"
          type="date"
          {...register("completion_data")}
        />
      </Label>

      <Label className={inter.className} htmlFor="priority">
        Selecione o nível de prioridade
        <Select id="priority" {...register("priority")}>
          <option value="alta">Alta</option>
          <option value="média">Média</option>
          <option value="baixa">Baixa</option>
        </Select>
      </Label>

      {errorMessage ? <Span>{errorMessage}</Span> : null}

      <Button type="submit">Entrar</Button>
    </Form>
  );
}
