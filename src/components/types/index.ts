export type DraftReducer<S, A> = React.Reducer<S, DraftAction<S, A>>

type DraftAction<S, A> = A & { readonly draft: S }
