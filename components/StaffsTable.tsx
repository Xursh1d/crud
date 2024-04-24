"use client";;
import { withTableCopy } from "@gravity-ui/uikit";
import { Table } from '@gravity-ui/uikit';
import { Pencil, TrashBin } from "@gravity-ui/icons";
import { IPosition, IStaff } from "@/types/todo";
import { dateFormat } from "@/utils/dateFormat";
import Loader from "./Loader";
import { useAppDispatch, useAppSelector } from "@/features/store";
import EmptyContent from "./EmptyContent";
import TableIcon from "./buttons/TableIcon";
import { setDeleteId, setUpdateId } from "@/features/todoSlice";

interface IStaffTableProps {
    staffs: IStaff[]
    isLoading: boolean
    isError: boolean
}
export default function StaffsTable({ staffs, isError, isLoading }: IStaffTableProps) {
    const { positions } = useAppSelector(state => state.todo)
    const dispatch = useAppDispatch()
    const MyTable = withTableCopy(Table);

    if (isLoading) return <Loader />
    if (isError) return <EmptyContent />

    const data = staffs.map((staff: IStaff, index: number) => {
        const position = positions?.find((position: IPosition) => position.id === staff.position); // Updated line
        return {
            id: index + 1,
            first_name: staff.first_name,
            last_name: staff.last_name,
            position: position?.title || "Position Not Found",
            date: dateFormat(staff.createdAt),
            edit_column: <TableIcon callBack={() => dispatch(setUpdateId(staff.id))} icon={Pencil} />,
            delete_column: <TableIcon callBack={() => dispatch(setDeleteId(staff.id))} icon={TrashBin} />,
        };
    });

    const columns = [
        { id: "id", name: "№", width: "5%" },
        { id: "first_name", name: "First name" },
        { id: "last_name", name: "Last name" },
        { id: "position", name: "Position" },
        { id: "date", name: "Date" },
        { id: "edit_column", name: "", width: "5%" },
        { id: "delete_column", name: "", width: "5%" },
    ];

    return <MyTable className="w-full" data={data as []} columns={columns} />
}
