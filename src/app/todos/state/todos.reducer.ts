import { Action, createReducer, on } from '@ngrx/store';
import * as TodoActions from './todo.actions';

import { FILTER_MODES } from './../constants/filter-modes';
import { ITodo } from '../interfaces/ITodo';

export interface ITodosState {
  filterMode?: FILTER_MODES;
  todos?: ITodo[];
}

export const initialState: ITodosState = {
  filterMode: 'All',
  todos: [],
};

export function todosReducer(state: ITodosState, action: Action) {
  return createReducer(
    initialState,
    on(TodoActions.addTodo, (existingState, { text }) => ({
      ...existingState,
      todos: [{ text, completed: false, isEditMode: false }, ...existingState.todos],
    })),
    on(TodoActions.removeTodo, (existingState, { index }) => {
      const updatedTodos = [...existingState.todos];
      updatedTodos.splice(index, 1);

      return {
        ...existingState,
        todos: updatedTodos,
      };
    }),
    on(TodoActions.changeFilterMode, (existingState, { mode }) => ({
      ...existingState,
      filterMode: mode,
    })),
    on(TodoActions.clearCompleted, (existingState) => ({
      ...existingState,
      todos: [...existingState.todos.filter(todo => !todo.completed)],
    })),
    on(TodoActions.editTodo, (existingState, { index }) => {
      let updatedTodos = [...existingState.todos];

      let deepCloneTodos: ITodo[] = JSON.parse(JSON.stringify(updatedTodos));
      deepCloneTodos.map(x => x.isEditMode = false);
      deepCloneTodos[index].isEditMode = true;

      return {
        ...existingState,
        todos: deepCloneTodos,
      };
    }),
    on(TodoActions.cancelEditTodo, (existingState, { index }) => {
      let updatedTodos = [...existingState.todos];

      let deepCloneTodos: ITodo[] = JSON.parse(JSON.stringify(updatedTodos));
      deepCloneTodos[index].isEditMode = false;

      return {
        ...existingState,
        todos: deepCloneTodos,
      };
    }),
    on(TodoActions.updateTodo, (existingState, { index, text }) => {
      let updatedTodos = [...existingState.todos];

      let deepCloneTodos: ITodo[] = JSON.parse(JSON.stringify(updatedTodos));
      deepCloneTodos[index].isEditMode = false;
      deepCloneTodos[index].text = text;

      return {
        ...existingState,
        todos: deepCloneTodos,
      };
    }),
    on(TodoActions.toggleCompleted, (existingState, { index }) => {
      let updatedTodos = [...existingState.todos];

      let deepCloneTodos: ITodo[] = JSON.parse(JSON.stringify(updatedTodos));
      deepCloneTodos[index].completed = !deepCloneTodos[index].completed;

      return {
        ...existingState,
        todos: deepCloneTodos,
      };
    }),
    on(TodoActions.toggleAllCompleted, (existingState, { checked }) => {
      let updatedTodos = [...existingState.todos];

      let deepCloneTodos: ITodo[] = JSON.parse(JSON.stringify(updatedTodos));
      deepCloneTodos.map(x => x.completed = checked);

      return {
        ...existingState,
        todos: deepCloneTodos,
      };
    }),
    on(TodoActions.clearCompleted, (existingState) => {
      let updatedTodos = [...existingState.todos];

      let deepCloneTodos: ITodo[] = JSON.parse(JSON.stringify(updatedTodos))
        .filter(x => x.completed == false);
      return {
        ...existingState,
        todos: deepCloneTodos,
      };
    }),
  )(state, action);
}

export const filterMode = (state: ITodosState) => state.filterMode;
export const todos = (state: ITodosState) => state.todos;
