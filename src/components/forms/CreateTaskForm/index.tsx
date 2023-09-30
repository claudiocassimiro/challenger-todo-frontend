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
} from "./createTaskForm";
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

interface CreateTaskFormProps {
  setTasks: Dispatch<SetStateAction<Task[]>>;
  tasks: Task[];
  setShowDialog: Dispatch<SetStateAction<boolean>>;
}

export default function CreateTaskForm({
  setTasks,
  tasks,
  setShowDialog,
}: CreateTaskFormProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const { token } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const parsedData = {
      ...formData,
      priority: formData.priority.toLowerCase(),
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
        parsedData
      );

      const { data } = response;
      setTasks([...tasks, data]);
      setShowDialog(false);

      reset();
    } catch (error) {
      setErrorMessage("Os dados de login estão incorretos!");
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
          {...register("title", { required: true })}
        />
        {errors.title && <Span>O título é obrigatório.</Span>}
      </Label>

      <Label className={inter.className} htmlFor="description">
        Descrição da tarefa
        <TextArea
          id="description"
          rows={3}
          placeholder="Digite seu email"
          {...register("description", { required: true })}
        />
        {errors.description && <Span>A descrição é obrigatória.</Span>}
      </Label>

      <Label className={inter.className} htmlFor="completion_data">
        Data esperada para conclusão
        <Input
          id="completion_data"
          type="date"
          {...register("completion_data", { required: true })}
        />
        {errors.completion_data && (
          <Span>O data esperada para conslusão é obrigatória.</Span>
        )}
      </Label>

      <Label className={inter.className} htmlFor="priority">
        Data esperada para conclusão
        <Select id="priority" {...register("priority", { required: true })}>
          <option>Alta</option>
          <option>Média</option>
          <option>Baixa</option>
        </Select>
        {errors.priority && (
          <Span>O data esperada para conslusão é obrigatória.</Span>
        )}
      </Label>

      {errorMessage ? <Span>{errorMessage}</Span> : null}

      <Button type="submit">Entrar</Button>
    </Form>
  );
}
