'use client'
import {
	equipmentHandoverControllerFindOneOptions,
	equipmentInstancesControllerSearchOptions,
} from '@/client/@tanstack/react-query.gen'
import { Card } from '@/components/ui/card'
import DataTable from '@/modules/common/components/organisms/DataTable'
import { useQuery } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'

type Props = {
	id: string
}

const HandoverViewForm = ({ id }: Props) => {
	const { data: handoverDetail, isFetching } = useQuery({
		...equipmentHandoverControllerFindOneOptions({
			path: {
				id: id,
			},
		}),
		enabled: !!id,
	})

	const columns: ColumnDef<{
		instanceId: string
		componentName: string
		unitOfMeasure: string
		quantity: number
		notes: string
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
			header: 'Tên trang bị',
		},
		{
			accessorKey: 'serial',
			header: 'Mã hiệu',
			cell: ({ row }) => {
				const { data: equipments } = useQuery({
					...equipmentInstancesControllerSearchOptions({
						query: { limit: 1000000, page: 1 },
					}),
				})
				const serial = equipments?.data?.find(
					(item) => item._id === row.original?.instanceId,
				)?.serialNumber

				return <div>{serial}</div>
			},
		},
		{
			accessorKey: 'quantity',
			header: 'Số lượng',
		},
		{
			accessorKey: 'notes',
			header: 'Ghi chú',
		},
	]

	if (isFetching) {
		return <div>Đang tải...</div>
	}

	if (!handoverDetail) {
		return <div>Không tìm thấy thông tin bàn giao</div>
	}

	return (
		<div>
			<Card className="p-6">
				<div className="grid gap-y-5 gap-x-20 grid-cols-2">
					<div>
						<label
							className="text-sm font-medium text-gray-700"
							htmlFor="reportNumber"
						>
							Số biên bản
						</label>
						<p id="reportNumber" className="mt-1 text-sm text-gray-900">
							{handoverDetail.reportNumber}
						</p>
					</div>
					<div />
					<div>
						<label
							className="text-sm font-medium text-gray-700"
							htmlFor="handoverDate"
						>
							Ngày giao
						</label>
						<p id="handoverDate" className="mt-1 text-sm text-gray-900">
							{handoverDetail.handoverDate
								? new Date(handoverDetail.handoverDate).toLocaleDateString(
										'vi-VN',
									)
								: 'N/A'}
						</p>
					</div>
					<div>
						{/* <label
							className="text-sm font-medium text-gray-700"
							htmlFor="handoverTime"
						>
							Thời gian
						</label>
						<p id="handoverTime" className="mt-1 text-sm text-gray-900">
							{handoverDetail.handoverDate
								? new Date(handoverDetail.handoverDate).toLocaleString('vi-VN')
								: 'N/A'}
						</p> */}
					</div>
					<div>
						<label
							className="text-sm font-medium text-gray-700"
							htmlFor="sender"
						>
							Người giao
						</label>
						<p id="sender" className="mt-1 text-sm text-gray-900">
							{handoverDetail.sender || 'N/A'}
						</p>
					</div>
					<div>
						<label
							className="text-sm font-medium text-gray-700"
							htmlFor="receiver"
						>
							Người nhận
						</label>
						<p id="receiver" className="mt-1 text-sm text-gray-900">
							{handoverDetail.receiver || 'N/A'}
						</p>
					</div>
					<div>
						<label
							className="text-sm font-medium text-gray-700"
							htmlFor="fromUnit"
						>
							Đơn vị giao
						</label>
						<p id="fromUnit" className="mt-1 text-sm text-gray-900">
							{handoverDetail.fromUnitId?.name || 'N/A'}
						</p>
					</div>
					<div>
						<label
							className="text-sm font-medium text-gray-700"
							htmlFor="toUnit"
						>
							Đơn vị nhận
						</label>
						<p id="toUnit" className="mt-1 text-sm text-gray-900">
							{handoverDetail.toUnitId?.name || 'N/A'}
						</p>
					</div>
					{handoverDetail.comment && (
						<div className="col-span-2">
							<label
								className="text-sm font-medium text-gray-700"
								htmlFor="comment"
							>
								Ghi chú
							</label>
							<p id="comment" className="mt-1 text-sm text-gray-900">
								{handoverDetail.comment}
							</p>
						</div>
					)}
				</div>

				{handoverDetail.items && handoverDetail.items.length > 0 && (
					<div className="mt-8">
						<label
							className="text-sm font-medium text-gray-700 mb-4 block"
							htmlFor="equipmentList"
						>
							Danh sách trang bị
						</label>
						<div id="equipmentList">
							<DataTable
								columns={columns}
								data={
									handoverDetail.items?.map((item: any) => ({
										instanceId: item?.instanceId?._id,
										componentName: item.instanceId?.name || 'N/A',
										unitOfMeasure: item.unitOfMeasure || 'Bộ',
										quantity: item.quantity || 0,
										notes: item.notes || '',
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

export default HandoverViewForm
