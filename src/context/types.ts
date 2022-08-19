export type UserT = {
  avatarUrl: string
  id: string
  name: string
}

export type FeedbackT = {
  id: number
  giver: ReceiverT
  receiver: ReceiverT
  feedback: FeedbackFormPayloadT[]
}

export type ReceiverT = {
  id: string
  name: string
  avatarUrl?: string
}

export type FeedbackFormPayloadT = {
  id: string
  question: string
  type: string
  value: any
}
