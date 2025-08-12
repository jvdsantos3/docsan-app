export type GetProfessionalsSummaryResponse = {
  summary: {
    totalPending: number
    totalApproved: number
    totalRejected: number
    totalBanned: number
    total: number
  }
}
