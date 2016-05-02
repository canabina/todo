import 'should';

import * as TodoActions from '../public/js/actions/todos.js';
import {todos} from '../public/js/reducers/todos.js';
import Todo from '../public/js/models/todo';

describe('collections test', function() {

    const initialState = [
      new Todo(0, 'Learn React'),
      new Todo(1, 'Learn Redux', true, [
        new Todo(4, 'Read manual'),
        new Todo(5, 'Write the code')
      ]),
      new Todo(2, 'Learn HTML', true),
      new Todo(3, 'Learn CSS')
    ];

    it('check', () => {
      initialState[1].children[0].done.should.equal(false);
      const result = todos(initialState, TodoActions.checkTodo(4));
      result[1].children[0].done.should.equal(true);
    });

    it('remove', () => {
      const result = todos(initialState, TodoActions.removeTodo(0));
      result.length.should.equal(3);
    });

    it('makeChildOf', () => {
      const result = todos(initialState, TodoActions.makeChildOf(4, 2));

      result[1].children.length.should.equal(1);
      result[2].children.length.should.equal(1);
      result[2].children[0].id.should.equal(4);
    });

    it('moveAboveTodo', () => {
      // the same level case
      const result1 = todos(initialState, TodoActions.moveAboveTodo(0, 3));
      result1[0].id.should.equal(1);
      result1[2].id.should.equal(0);
      result1[3].id.should.equal(3);

      // different level cases level case
      const result2 = todos(initialState, TodoActions.moveAboveTodo(2, 5));
      result2[1].children[1].id.should.equal(2);
      result2[1].children[2].id.should.equal(5);
    });

    it('moveBelowTodo', () => {
      // the same level case
      const result1 = todos(initialState, TodoActions.moveBelowTodo(0, 3));
      result1[0].id.should.equal(1);
      result1[2].id.should.equal(3);
      result1[3].id.should.equal(0);

      // different level cases level case
      const result2 = todos(initialState, TodoActions.moveBelowTodo(2, 5));
      result2[1].children[1].id.should.equal(5);
      result2[1].children[2].id.should.equal(2);
    });

    it('flipTodo', () => {
      initialState[1].open.should.equal(false); // check initial state

      const result1 = todos(initialState, TodoActions.flipTodo(1));
      result1[1].open.should.equal(true); // first flip (expand)

      const result2 = todos(result1, TodoActions.flipTodo(1));
      result2[1].open.should.equal(false); // second flip (collapse)
    });

});
