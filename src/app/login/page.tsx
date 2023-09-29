"use client";

import { Inter } from "next/font/google";

import { useForm, SubmitHandler } from "react-hook-form";

import { Main, Form, Input, Label, Span, Button, Link } from "./loginStyles";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Inputs = {
  email: string;
  password: string;
};

const inter = Inter({ subsets: ["latin"] });

export default function Login() {
  const { push } = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/login`,
        formData
      );

      const { data } = response;

      const { token, userId } = data;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      reset();
      push("/tasks");
    } catch (error) {
      setErrorMessage("Os dados de login estão incorretos!");
      setTimeout(() => {
        setErrorMessage("");
      }, 3500);
    }
  };

  return (
    <Main>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Image
          src="/LogoTodoList.svg"
          width="250"
          height="80"
          alt="Logo da TODO list"
          priority
        />

        <Label className={inter.className} htmlFor="email">
          Email
          <Input
            id="email"
            type="email"
            placeholder="Digite seu email"
            {...register("email", { required: true })}
          />
          {errors.email && <Span>O email é obrigatório.</Span>}
        </Label>

        <Label className={inter.className} htmlFor="password">
          Senha
          <Input
            id="password"
            type="password"
            placeholder="Digite seu email"
            {...register("password", { required: true })}
          />
          {errors.password && <Span>A senha é obrigatória.</Span>}
        </Label>

        {errorMessage ? <Span>{errorMessage}</Span> : null}

        <Button type="submit">Entrar</Button>
        <Link href="/register">Fazer cadastro</Link>
      </Form>
    </Main>
  );
}
