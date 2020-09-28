import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ITodo } from '@app/todos/interfaces';
import { TodosService } from '@app/todos/services/todos.service';


@Component({
  selector: 'app-todos-list',
  styleUrls: [
    './todo-list.component.scss',
  ],
  templateUrl: './todo-list.component.html',
})
export class TodosListComponent {
  @Input() todoList: ITodo[] = [];
  constructor(
    private todosService: TodosService) {
  }

  editTodo(todo: ITodo): void {
    this.todosService.editTodo(this.todoList.findIndex(x => x.text.toLowerCase() == todo.text.toLowerCase()));
  }

  cancelEditTodo(todo: ITodo): void {
    this.todosService.cancelEditTodo(this.todoList.findIndex(x => x.text.toLowerCase() == todo.text.toLowerCase()));
  }

  updateEditTodo(todo: ITodo, text: string): void {
    this.todosService.updateEditTodo(this.todoList.findIndex(x => x.text.toLowerCase() == todo.text.toLowerCase()), text);
  }

  removeTodo(todo: ITodo): void {
    this.todosService.removeTodo(this.todoList.findIndex(x => x.text.toLowerCase() == todo.text.toLowerCase()));
  }

  toggleComplete(todo: ITodo): void {
    this.todosService.toggleComplete(this.todoList.findIndex(x => x.text.toLowerCase() == todo.text.toLowerCase()));
  }

}
