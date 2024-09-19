"use client";

import Link from "next/link";
import { redirect } from "next/navigation";

import Gap from "@/components/Reusables/Gap";
import InputField from "@/components/Reusables/InputField";
import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";

export default function LoginForm() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const form_fields = [
    {
      type: "email",
      label: "Your Email",
      name: "email",
      required: true,
    },
    {
      type: "password",
      label: "Your Password",
      name: "password",
      required: true,
    },
  ];

  const handle_change = (input: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [input.target.name]: input.target.value,
    });
  };

  const handle_submit = (form: React.FormEvent) => {
    form.preventDefault();
    redirect("/dashboard");
  };

  return (
    <div className="flexCenter flex-col w-full gap-y-3">
      <Link href="/" className="block w-full">
        <ArrowLeftIcon />
      </Link>
      <form onSubmit={handle_submit} className="w-full rounded-lg border p-4">
        {form_fields.map((field) => (
          <InputField key={field.name} {...field} onChange={handle_change} />
        ))}
        <Gap />
        <button
          type="submit"
          className="rounded textBg flexCenter gap-x-2 w-fit px-4 py-2 transition-all text-sm"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
