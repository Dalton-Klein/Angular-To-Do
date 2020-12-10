import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/Todo'


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos!: Todo[];

  constructor(private todoService:TodoService) { }

  ngOnInit() {
    //subscribe is basically .then (async)
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  deleteTodo(todo:Todo) {
    console.log('Delete Me PLZ');
    // Delete item from UI
    this.todos = this.todos.filter(t => t.id !== todo.id);
    // Delete item on server
    this.todoService.deleteTodo(todo).subscribe();
  }

  addTodo(todo:Todo) {
    console.log('Tried to add?');
    
    this.todoService.addTodo(todo).subscribe(todo => {
      this.todos.push(todo);
    })
  }
}
