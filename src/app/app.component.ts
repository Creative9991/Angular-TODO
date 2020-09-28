import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ITodo } from './todos/interfaces';
import { TodosService } from './todos/services/todos.service';
import { FILTER_MODES } from './todos/constants/filter-modes';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit {
  txtTodo: string = '';
  fullTodoList: ITodo[] = [];
  filteredTodos = [];
  errMsg: string = '';
  currentStatus: string = 'All';
  constructor(
    private todosService: TodosService,
  ) { }


  ngOnInit(): void {
    this.getTodoList();
    this.todosService.refreshListEvent.subscribe(() => {
      this.getTodoList();
    })
  }

  addTodo(): void {
    if (this.txtTodo.trim().length > 0) {
      if (this.fullTodoList.findIndex(x => x.text.toLowerCase() == this.txtTodo.trim().toLowerCase()) < 0) {
        this.todosService.addTodo(this.txtTodo);
        this.txtTodo = '';
        this.errMsg = '';
        //this.filterTodo(this.currentStatus);
      }
      else {
        this.errMsg = 'Todo Already Exist!!';
      }
    }

  }

  getTodoList(): void {
    this.todosService.allTodos$.subscribe((list) => {
      this.fullTodoList = list;
      this.filterTodo(this.currentStatus);
    })
  }

  getCompleted(): ITodo[] {
    return this.fullTodoList.filter(x => x.completed == true);
  }

  clearCompleted(): void {
    this.todosService.clearCompleted();
  }

  filterTodo(filter: string = 'All'): void {
    this.currentStatus = filter;
    let filterMode: FILTER_MODES = filter == 'Completed' ? ('Completed') : (filter == 'Active' ? 'Active' : 'All');
    this.todosService.changeFilterMode(filterMode);

    if (filter == 'Completed')
      this.filteredTodos = this.fullTodoList.filter(x => x.completed == true);
    else if (filter == 'Active')
      this.filteredTodos = this.fullTodoList.filter(x => x.completed == false);
    else
      this.filteredTodos = this.fullTodoList;
  }

  getRemaining(): number {
    return this.fullTodoList.filter(x => x.completed == false).length;
  }
}