import React, { createContext, useReducer } from 'react'
import { QuestionT } from './types'

type DispatchQuestionContextT = any

export const DispatchQuestionContext =
  createContext<DispatchQuestionContextT | null>(null)
export const QuestionContext = createContext<QuestionT[] | null>(null)

type SetQuestionsT = {
  action: 'set'
  payload: Array<QuestionT>
}

const reducer = (
  state: QuestionT[] | null,
  update: SetQuestionsT,
): QuestionT[] | null => {
  if (update.action === 'set') {
    return update.payload
  }

  return state
}

const UIProvider = ({ children }: { children: React.ReactNode }): any => {
  const [state, dispatch] = useReducer(reducer, [])
  console.log('questions', state)

  return (
    <DispatchQuestionContext.Provider value={dispatch}>
      <QuestionContext.Provider value={state}>
        {children}
      </QuestionContext.Provider>
    </DispatchQuestionContext.Provider>
  )
}

export default UIProvider
