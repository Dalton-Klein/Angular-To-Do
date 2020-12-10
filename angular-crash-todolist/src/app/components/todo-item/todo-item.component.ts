import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from 'src/app/models/Todo';

import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})

export class TodoItemComponent implements OnInit {

  @Input() todo!: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
  }

  //Set dynamic classes
  setClasses() {
    let classes = {
      todo: true,
      'is-complete': this.todo.completed
    }
    return classes;
  }

  // onToggle
  onToggle(todo:Todo) {
    // Toggle in UI
    todo.completed = !todo.completed;
    // Toggle for server
    this.todoService.toggleCompleted(todo).subscribe(todo => {
      console.log(todo);
      
    })
  }

  //onDelete
  onDelete(todo:Todo) {
    this.deleteTodo.emit(todo);
  }
}
