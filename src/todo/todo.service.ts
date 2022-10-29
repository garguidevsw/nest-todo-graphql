import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoInput, UpdateTodoInput, StatusArgs } from './dto';
import { Todo } from './entity/todo.entity';

@Injectable()
export class TodoService {
    private todos: Todo[] = [
        {
            id: 1,
            description: "Piedra del alma",
            done: false
        },
        {
            id: 2,
            description: "Piedra del espacio",
            done: false
        },
        {
            id: 3,
            description: "Piedra de poder",
            done: true
        },
    ];

    get totalTodos() {
        return this.todos.length;
    }
    
    get completedTodos() {
        return this.todos.filter( todo => todo.done ).length;
    }
    
    get pendingTodos() {
        return this.todos.filter( todo => !todo.done ).length;
    }

    findAll( statusArgs: StatusArgs ): Todo[] {

        if( statusArgs.status !== undefined ) return this.todos.filter( todo => todo.done === statusArgs.status );

        return this.todos;

    }

    findOne(id: number): Todo {
        const todo = this.todos.find( todo => todo.id === id );
        
        if(!todo) throw new NotFoundException(`Todo #${id} not found`)
        
        return todo;
    }

    create( createTodoInput: CreateTodoInput ): Todo {
        const todo = new Todo();
        todo.description = createTodoInput.description;
        todo.id = Math.max( ...this.todos.map( todo => todo.id ), 0) + 1;

        this.todos.push(todo);

        return todo;
    }

    update( updateTodoInput: UpdateTodoInput ): Todo {
        const { id, description, done } = updateTodoInput;
        const todoUpdate = this.findOne(id);

        if( description ) todoUpdate.description = description;
        if( done !== undefined ) todoUpdate.done = done;

        this.todos = this.todos.map( todo => {
             return (todo.id === id) ? todoUpdate : todo;
        });

        return todoUpdate;
    }

    delete( id: number ): string {
        const todo = this.findOne(id);
        this.todos = this.todos.filter( item => item.id !== id );

        return `Delete todo #${id} sucessfully`;
    }
}
