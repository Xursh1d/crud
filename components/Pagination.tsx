import { Pagination as TablePagination, PaginationProps } from '@gravity-ui/uikit';

interface IPaginationProps {
    page: number,
    pageSize: number
    total?: number
    handleUpdate: PaginationProps['onUpdate'];
}

export default function Pagination({ page, pageSize, total, handleUpdate }: IPaginationProps) {
    return (
        <div className='flex justify-end pt-4'>
            <TablePagination page={page} pageSize={pageSize} onUpdate={handleUpdate} />
        </div>
    )
}
