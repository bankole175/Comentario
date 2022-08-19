import React, { createContext, useReducer } from 'react'

type DispatchProgressContextT = any

export const DispatchProgressContext =
  createContext<DispatchProgressContextT>(0)
export const ProgressContext = createContext<number>(0)

type SetProgressT = {
  action: 'set'
}

type IncrementProgressT = {
  action: 'increment'
}

type DecrementProgressT = {
  action: 'decrement'
}

const reducer = (
  state: number,
  update: SetProgressT | IncrementProgressT | DecrementProgressT,
): number => {
  switch (update.action) {
    case 'set':
      return 0
    case 'increment':
      return state + 1
    case 'decrement':
      return state - 1
    default:
      return state
  }
}

const UIProvider = ({ children }: { children: React.ReactNode }): any => {
  const [state, dispatch] = useReducer(reducer, 0)

  return (
    <DispatchProgressContext.Provider value={dispatch}>
      <ProgressContext.Provider value={state}>
        {children}
      </ProgressContext.Provider>
    </DispatchProgressContext.Provider>
  )
}

export default UIProvider
