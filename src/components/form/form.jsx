import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Zod skema
const schema = z.object({
  title: z.string().min(1, "Sarlavha talab qilinadi"),
  description: z.string().min(1, "Tavsif talab qilinadi"),
});

export const Form = ({ onAdd }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    onAdd(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input className="input" {...register("title")} placeholder="Title" />
        {errors.title && <p>{errors.title.message}</p>}
      </div>
      <div>
        <input className="input" {...register("description")} placeholder="Description"/>
        {errors.description && <p>{errors.description.message}</p>}
      </div>
      <button className="create_btn" type="submit">Create</button>
    </form>
  );
};
