import type { Row } from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'
import type { GetBranchesActivityResponse } from '@/types/http/get-branches-activity-response'

type BranchActivityData = GetBranchesActivityResponse['branchesActivity']['data'][number]

interface BranchNameCellProps {
  row: Row<BranchActivityData>
}

export const BranchNameCell = ({ row }: BranchNameCellProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/admin/branches-activity/${row.original.id}/registry-types`)
  }

  return (
    <span
      className="font-bold text-gray-900 cursor-pointer hover:text-blue-600 underline"
      onClick={handleClick}
    >
      {row.getValue('name')}
    </span>
  )
}