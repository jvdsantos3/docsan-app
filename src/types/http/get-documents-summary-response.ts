export type GetDocumentsSummaryResponse = {
  summary: {
    up_to_date: number
    due_soon: number
    overdue: number
  }
}
