// Library code
function createStore (reducer) {
  // 1. The state
  // 2. Get the state
  // 3. Listen to changes on the state
  // 4. Update the state

  let state
  let listeners = []

  const getState = () => state

  const subscribe = (listener) => {
    listeners.push(listener)
    return () => {
      lesteners = listeners.filter((l) => l !== listener)
    }
  }

  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach((listener) => listener())
  }

  return {
    getState,
    subscribe,
    dispatch
  }
}

// App code
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_TODO = 'REMOVE_TODO'

function addTodoAction(todo) {
  return {
    type: ADD_TODO,
    todo
  }
}

function removeTodoAction(id) {
  return {
    type: REMOVE_TODO,
    id
  }
}

function toggleTodoAction(id) {
  return {
    type: TOGGLE_TODO,
    id
  }
}

function addGoalAction(goal) {
  return {
    type: ADD_GOAL,
    goal
  }
}

function removeGoalAction(id) {
  return {
    type: REMOVE_GOAL,
    id
  }
}

function todos(state = [], action) {
  switch(action.type) {
    case ADD_TODO :
      return state.concat([action.todo])

    case REMOVE_TODO :
      return state.filter((todo) => todo.id !== action.id)

    case TOGGLE_TODO :
      return state.map((todo) => todo.id !== action.id ? todo :
        Object.assign({}, todo, {complete: !todo.complete}))

    default :
      return state
  }
}

function goals(state = [], action) {
  switch(action.type) {
    case ADD_GOAL :
      return state.concat([action.goal])

    case REMOVE_TODO :
      return state.filter((goal) => goal.id !== action.id)

    default :
      return state
  }
}

function app (state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action)
  }
}

const store = createStore(todos)

store.subscribe(() => {
  console.log('The new state is: ', store.getState())
})

store.dispatch(addTodoAction({
    id: 0,
    name: 'Learn Redux',
    complete: false
}))