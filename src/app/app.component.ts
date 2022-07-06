import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from './model/todo';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Lista de tarefas';
  public listaTarefas: Todo[] = [];
  public form: FormGroup;


  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      task: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.required
      ])]
    });
    this.load();
  }

  remove(item: Todo) {
    const indexItem = this.listaTarefas.indexOf(item);

    if (indexItem !== -1) {
      this.listaTarefas.splice(indexItem, 1);
    }
    this.save();
  }
  markAsDone(item: Todo) {
    item.done = true;
    this.save();
  }
  markAsUndone(item: Todo) {
    item.done = false;
    this.save();
  }
  
  addTask() {
    const task = this.form.controls['task'].value;
    const contador = this.listaTarefas.length + 1;
    this.listaTarefas.push(new Todo(contador, task, false));
    this.save();

    this.clear();
  }

  save() {
    const data = JSON.stringify(this.listaTarefas);
    localStorage.setItem('tarefas', data);
  }

  load(){
    this.listaTarefas = JSON.parse(localStorage.getItem('tarefas') || '[]');
  }

  clear(){
    this.form.reset();
  }

}