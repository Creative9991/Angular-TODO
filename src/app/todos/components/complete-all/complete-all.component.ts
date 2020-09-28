import { ChangeDetectorRef, ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { TodosService } from '@app/todos/services/todos.service';
import { ITodo } from '@app/todos/interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-complete-all',
  styleUrls: [
    './complete-all.component.scss',
  ],
  templateUrl: './complete-all.component.html',
})
export class CompleteAllComponent implements OnInit, OnDestroy {

  multipleTodosExist = false;
  subscription: Subscription;
  todoList: ITodo[] = [];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private todosService: TodosService,
  ) { }

  ngOnInit(): void {
    this.getAllTodoList()
    this.todosService.refreshListEvent.subscribe(() => {
      this.getAllTodoList();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggleCompleteAll(checked: boolean): void {
    this.todosService.toggleAllCompleted(checked);
  }

  getAllTodoList(): void {
    this.subscription = this.todosService.allTodos$.subscribe(todos => {
      this.multipleTodosExist = todos && todos.filter(x => x.completed == false).length > 0;
      this.todoList = todos;
      this.changeDetectorRef.markForCheck();
    });
  }

}
