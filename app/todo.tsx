"use client";

"use client";

import React, { useState, useEffect } from "react";
import { VStack, Heading, IconButton, useColorMode } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import SearchBar from "./components/SearchBar";
import { Todo } from "./types";

interface MainComponentProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const MainComponent: React.FC<MainComponentProps> = ({ todos, setTodos }) => {
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const { colorMode, toggleColorMode } = useColorMode();

  function deleteTodo(id: number) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function addTodo(todo: Todo) {
    setTodos([...todos, todo]);
  }

  const filteredList = todos.filter((todo) =>
    todo.body.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <VStack p={4}>
      <IconButton
        icon={colorMode === "light" ? <FaSun /> : <FaMoon />}
        isRound
        size="lg"
        alignSelf="flex-end"
        onClick={toggleColorMode}
        aria-label="Toggle color mode"
      />
      <Heading mb={4} fontSize="xl">
        Todo App
      </Heading>
      <SearchBar search={search} setSearch={setSearch} />
      <TodoList todos={filteredList} deleteTodo={deleteTodo} />
      <AddTodo addTodo={addTodo} />
    </VStack>
  );
};

export default MainComponent;
