'use client'
import { equipmentHandoverControllerSearchOptions } from '@/client/@tanstack/react-query.gen'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { pageList } from '@/configs/routes'
import DataTable from '@/modules/common/components/organisms/DataTable'
import { useQuery } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'

type Props = {
	id: string
}

const HandoverViewForm = ({ id }: Props) => {
	const router = useRouter()

	const { data: handoverDetail, isFetching } = useQuery({
		...equipmentHandoverControllerSearchOptions({
			query: {
				limit: 1,
				page: 1,
				_id: id,
			},
		}),
		enabled: !!id,
		select: (data: any) => data?.data?.[0],
	})

	const columns: ColumnDef<{
		index: number
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
			header: 'Tên trang bị',
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
						<label
							className="text-sm font-medium text-gray-700"
							htmlFor="handoverTime"
						>
							Thời gian
						</label>
						<p id="handoverTime" className="mt-1 text-sm text-gray-900">
							{handoverDetail.handoverDate
								? new Date(handoverDetail.handoverDate).toLocaleString('vi-VN')
								: 'N/A'}
						</p>
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
									handoverDetail.items?.map((item: any, index: number) => ({
										index,
										componentName: item.instanceId?.name || 'N/A',
										unitOfMeasure: item.unitOfMeasure || 'Bộ',
										quantity: item.quantity || 0,
										note: item.note || '',
									})) || []
								}
							/>
						</div>
					</div>
				)}

				<div className="mt-10 flex items-center justify-end gap-x-5">
					<Button
						type="button"
						variant="secondary"
						onClick={() => {
							router.push(pageList.equipmentSetHandover.href)
						}}
					>
						Quay lại
					</Button>
					<Button
						type="button"
						onClick={() => {
							router.push(
								pageList.equipmentSetHandoverDetailUpdate({ id }).href,
							)
						}}
					>
						Chỉnh sửa
					</Button>
				</div>
			</Card>
		</div>
	)
}

export default HandoverViewForm
