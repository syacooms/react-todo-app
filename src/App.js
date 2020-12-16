import React, { useRef, useState, useCallback, useReducer } from 'react';
import './App.css';
import TodoInsert from './TodoInsert';
import TodoList from './TodoList';
import TodoTemplate from './TodoTemplate';

function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}

function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT': //새로 추가
      // { type: 'INSERT' , todo: {id : 1 , text 'todo', checked: false }}
      return todos.concat(action.todo);
    case 'REMOVE': //제거
      // { type: 'REMOVE' , id:1 }
      return todos.filter((todo) => todo.id !== action.id);
    case 'TOGGLE': //토글
      // { type: 'REMOVE', id : 1 }
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );
    default:
      return todos;
  }
}

const App = () => {
  // 원래 2번째 파라미터에는 초기 상태를 넣어줘야한다.
  // 이렇게하면 컴포넌트가 맨 처음 렌더링 될 때만 createBulkTodos 함수가 호출된다.
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  //고유 값 id
  const nextId = useRef(2501);

  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    dispatch({ type: 'INSERT', todo });
    nextId.current += 1;
  }, []);

  const onRemove = useCallback((id) => {
    dispatch({ type: 'REMOVE', id });
  }, []);

  const onToggle = useCallback((id) => {
    dispatch({ type: 'TOGGLE', id });
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
