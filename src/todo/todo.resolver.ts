import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTodoInput, UpdateTodoInput, StatusArgs } from './dto';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { AgreggationsType } from './types/aggregations.type';

@Resolver( () => Todo )
export class TodoResolver {

    constructor( private readonly todoService: TodoService){}

    @Query( () => [Todo], { name: 'todos', description: 'Return all todos' } )
    findAll(
        @Args() statusArgs: StatusArgs
    ): Todo[] {
        return this.todoService.findAll(statusArgs);
    }

    @Query( () => Todo, { name: 'todo', description: 'Return todo by id'})
    findOne( @Args( 'id', { type: () => Int }) id: number) {
        return this.todoService.findOne(id);
    }

    @Mutation( () => Todo, { name: 'createTodo', description: 'Create new Todo'} )
    createTodo(
        @Args('createTodoInput') createTodoInput: CreateTodoInput
     ) {
        return this.todoService.create(createTodoInput);
    }

    @Mutation( () => Todo, { name: 'updateTodo', description: 'Update Todo'} )
    updateTodo(
        @Args('updateTodoInput') updateTodoInput: UpdateTodoInput
    ) {
        return this.todoService.update(updateTodoInput);
    }

    @Mutation( () => String, { name: 'deleteTodo', description: 'Delete todo by id'})
    deleteTodo(
        @Args('id', { type: () => Int }) id: number
    ) {
        return this.todoService.delete(id);
    }

    @Query( () => Int, {name: 'totalTodos'} )
    totalTodos(): number {
        return this.todoService.totalTodos;
    }

    @Query( () => Int, {name: 'completedTodos'} )
    completedTodos(): number {
        return this.todoService.completedTodos;
    }

    @Query( () => Int, {name: 'pendingTodos'} )
    pendingTodos(): number {
        return this.todoService.pendingTodos;
    }

    //Aggregations
    @Query( () => AgreggationsType )
    aggregations(): AgreggationsType {
        return {
            completed: this.todoService.completedTodos,
            pending: this.todoService.pendingTodos,
            total: this.todoService.totalTodos,
            totalTodos: this.todoService.totalTodos
        }
    }
}
