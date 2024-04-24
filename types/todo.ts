export interface IPosition {
  id: string;
  title: string;
}
export interface IStaff {
  createdAt: string;
  first_name: string;
  avatar: string;
  last_name: string;
  position: string;
  id: string;
}
export interface IDataRow {
  checkbox: JSX.Element;
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  date: boolean;
  edit_column: JSX.Element;
  delete_column: JSX.Element;
}

export interface FormValues {
  first_name: string;
  last_name: string;
  position: string;
}
