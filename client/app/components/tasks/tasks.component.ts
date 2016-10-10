import { Component } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../../tasks';

@Component({
	moduleId: module.id,
	selector: 'tasks',
	templateUrl: 'tasks.component.html'
})

export class TasksComponent {
	tasks: Task[];
	title: string;

	constructor(private tasksService:TasksService){

	this.tasksService.getTasks()
		.subscribe(tasks => {
			// console.log(tasks)
			this.tasks = tasks;
		});
	}

	addTask(event){
		event.preventDefault();
 
		var newTask = {
			title: this.title,
			isDone: false
		};

		this.tasksService.addTask(newTask)
			.subscribe(task => {
				this.tasks.push(task);
				this.title = '';
			});
	}

	updateStatus(task){
		var _task = {
			_id: task._id,
			title: task.title,
			isDone: !task.isDone
		}

		this.tasksService.updateStatus(_task)
			.subscribe(data => {
				task.isDone = !task.isDone;
			});
	}
}