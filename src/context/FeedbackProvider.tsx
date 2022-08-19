import React, { createContext, useReducer } from 'react'
import { FeedbackT } from './types'

type DispatchFeedbackContextT = any

export const DispatchFeedbackContext =
  createContext<DispatchFeedbackContextT | null>(null)
export const FeedbackContext = createContext<FeedbackT[] | null>(null)

type SetFeedbackT = {
  action: 'set'
  payload: FeedbackT[]
}

type UpdateFeedbackT = {
  action: 'update'
  payload: FeedbackT
}

const reducer = (
  state: FeedbackT[] | null,
  update: SetFeedbackT | UpdateFeedbackT,
): FeedbackT[] | null => {
  switch (update.action) {
    case 'set':
      return update.payload
    case 'update':
      return state !== null ? [...state, update.payload] : [update.payload]
    default:
      return state
  }
}

const UIProvider = ({ children }: { children: React.ReactNode }): any => {
  const [state, dispatch] = useReducer(reducer, [])

  return (
    <DispatchFeedbackContext.Provider value={dispatch}>
      <FeedbackContext.Provider value={state}>
        {children}
      </FeedbackContext.Provider>
    </DispatchFeedbackContext.Provider>
  )
}

export default UIProvider
