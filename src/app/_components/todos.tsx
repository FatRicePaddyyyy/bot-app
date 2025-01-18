"use client";

import { api } from "~/trpc/react";
import { Todo } from "./todo";
import { ProgressBar } from "./progress-bar";

export function Todos() {
  // データを新しく取得する場合
  // const [todos] = api.todo.all.useQuery();

  // データをキャッシュから取得する場合
  const [todos] = api.todo.all.useSuspenseQuery();

  if (!todos)
    return (
      <div className="flex items-center justify-center">
        <p className="ml-4 mt-10 text-xl">Error fetching todos</p>
      </div>
    );

  return (
    <>
      {todos.map((todo) => {
        return (
          <section key={todo.id} className="mt-8 space-y-4">
            <Todo todo={todo} />
          </section>
        );
      })}
      <ProgressBar todos={todos} />
    </>
  );
}
