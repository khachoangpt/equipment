'use client'

import {
	equipmentDisposeControllerFindByDecisionNumberOptions,
	unitsControllerFindAllOptions,
	usersControllerFindAllOptions,
} from '@/client/@tanstack/react-query.gen'
import { Card } from '@/components/ui/card'
import DataTable from '@/modules/common/components/organisms/DataTable'
import { useQuery } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'

type Props = {
	id: string
}

const LiquidationDetailView = ({ id }: Props) => {
	const { data: liquidationData, isFetching } = useQuery({
		...equipmentDisposeControllerFindByDecisionNumberOptions({
			path: { decisionNumber: id },
		}),
	})

	const { data: units } = useQuery({
		...unitsControllerFindAllOptions({ query: { limit: 1000000, page: 1 } }),
	})

	const { data: accounts } = useQuery({
		...usersControllerFindAllOptions({
			query: { limit: 1000000, page: 1 },
		}),
		select: (data) => {
			return data?.map((account) => ({
				label: account.fullName || account.username,
				value: account._id,
			}))
		},
	})

	const columns: ColumnDef<{
		instanceId: string
		serialNumber: string
		componentName: string
		unitOfMeasure: string
		quantity: number
		note: string
	}>[] = [
		{
			accessorKey: 'index',
			header: 'STT',
			cell: ({ row }) => {
				return <div>{row.index + 1}</div>
			},
		},
		{
			accessorKey: 'componentName',
			header: 'Tên',
		},
		{
			accessorKey: 'serialNumber',
			header: 'Mã hiệu',
		},
		{
			accessorKey: 'quantity',
			header: 'Số lượng',
		},
		{
			accessorKey: 'note',
			header: 'Ghi chú',
		},
	]

	const getUnitName = (unitId: string) => {
		return units?.data?.find((unit) => unit._id === unitId)?.name || 'N/A'
	}

	const getAccountName = (accountId: string) => {
		return (
			accounts?.find((account) => account.value === accountId)?.label || 'N/A'
		)
	}

	if (isFetching) {
		return <div>Đang tải...</div>
	}

	if (!liquidationData) {
		return <div>Không tìm thấy thông tin thanh lý</div>
	}

	return (
		<div>
			<Card className="p-6">
				<div className="grid gap-y-5 gap-x-20 grid-cols-2">
					<div>
						<label
							className="text-sm font-medium text-gray-700"
							htmlFor="decisionNumber"
						>
							Số quyết định
						</label>
						<p id="decisionNumber" className="mt-1 text-sm text-gray-900">
							{liquidationData.decisionNumber}
						</p>
					</div>
					<div />
					<div>
						<label
							className="text-sm font-medium text-gray-700"
							htmlFor="disposalDate"
						>
							Ngày thanh lý
						</label>
						<p id="disposalDate" className="mt-1 text-sm text-gray-900">
							{liquidationData.disposalDate
								? new Date(liquidationData.disposalDate).toLocaleDateString(
										'vi-VN',
									)
								: 'N/A'}
						</p>
					</div>
					<div>
						<label
							className="text-sm font-medium text-gray-700"
							htmlFor="disposalTime"
						>
							Thời gian
						</label>
						<p id="disposalTime" className="mt-1 text-sm text-gray-900">
							{liquidationData.disposalDate
								? new Date(liquidationData.disposalDate).toLocaleString('vi-VN')
								: 'N/A'}
						</p>
					</div>
					<div>
						<label
							className="text-sm font-medium text-gray-700"
							htmlFor="approver"
						>
							Người lập
						</label>
						<p id="approver" className="mt-1 text-sm text-gray-900">
							{getAccountName(liquidationData.approver || '')}
						</p>
					</div>
					<div>
						<label
							className="text-sm font-medium text-gray-700"
							htmlFor="signer"
						>
							Người ký
						</label>
						<p id="signer" className="mt-1 text-sm text-gray-900">
							{liquidationData.signer || 'N/A'}
						</p>
					</div>
					<div>
						<label
							className="text-sm font-medium text-gray-700"
							htmlFor="fromUnit"
						>
							Đơn vị
						</label>
						<p id="fromUnit" className="mt-1 text-sm text-gray-900">
							{getUnitName(
								typeof liquidationData.fromUnitId === 'string'
									? liquidationData.fromUnitId
									: (liquidationData.fromUnitId as any)?._id || '',
							)}
						</p>
					</div>
					<div />
					{liquidationData.notes && (
						<div className="col-span-2">
							<label
								className="text-sm font-medium text-gray-700"
								htmlFor="notes"
							>
								Ghi chú
							</label>
							<p id="notes" className="mt-1 text-sm text-gray-900">
								{liquidationData.notes}
							</p>
						</div>
					)}
				</div>

				{liquidationData.items && liquidationData.items.length > 0 && (
					<div className="mt-8">
						<label
							className="text-sm font-medium text-gray-700 mb-4 block"
							htmlFor="equipmentList"
						>
							Danh sách trang bị thanh lý
						</label>
						<div id="equipmentList">
							<DataTable
								columns={columns}
								data={
									liquidationData.items?.map((item: any) => ({
										instanceId: item?.equipmentDetails?._id,
										serialNumber: item?.equipmentDetails?.serialNumber,
										componentName: item.equipmentDetails?.name || 'N/A',
										unitOfMeasure: item.unitOfMeasure || 'Bộ',
										quantity: item.quantity || 0,
										note: item.notes ?? '',
									})) || []
								}
							/>
						</div>
					</div>
				)}
			</Card>
		</div>
	)
}

export default LiquidationDetailView
