# REDUX

## Why Redux

- When a javascript application grows big, it becomes difficult for the developer to manage its state.
- Redux solves this problem by managing application's state with a single global obejct called store
- Makes testing very easy
- Consistency throughout the application

## Actions and Reducers

- An action is plain object that descibes the intention to cause change
- A reducer is a function that determines changes to an application's state. Return the new state and tell the store how to do
- It uses the action it receives to determine this change
