"use client";
import React, { useState } from "react";
import Input from "./Input";
import { Plus } from "@gravity-ui/icons";
import PageTitle from "./PageTitle";
import SearchField from "./SearchField";
import SelectField from "./Select";
import { IPosition } from "@/types/todo";
import { useRouter } from "next/navigation";
import { Button, Icon, useToaster } from "@gravity-ui/uikit";
import ActionButton from "./buttons/ActionButton";
import { useAppDispatch, useAppSelector } from "@/features/store";
import { useGetPositionsQuery } from "@/features/api/positions";
import { setParams, setPositions, updateParams } from "@/features/todoSlice";
import { ArrowsRotateLeft } from '@gravity-ui/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function TableHeader() {
  const router = useRouter()
  const { add } = useToaster()
  const [searchValue, setSearchValue] = useState("")

  const { data: positions, isLoading, isError } = useGetPositionsQuery();
  const selectOptions = positions?.map((position: IPosition) => ({ content: position.title, value: position.id }))

  const queryParams = useAppSelector(state => state.todo.queryParams)
  const dispatch = useAppDispatch()
  dispatch(setPositions(positions))

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value)
  };

  const searchCallBack = () => {
    const newParams = { ...queryParams };

    if (!searchValue) delete newParams.search;
    else {
      newParams.search = searchValue;
      newParams.page = "1";
    }
    dispatch(setParams(newParams));
  };


  const keyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    const newParams = { ...queryParams };
    if (!e.currentTarget.value) delete newParams.search;
    else {
      newParams.search = e.currentTarget.value;
      newParams.page = "1";
    }
    dispatch(setParams(newParams));
  };

  const positionCallBack = (value: string[]) => {
    const newParams = { ...queryParams };
    if (!value[0]) delete newParams.position;
    else {
      newParams.position = value[0];
      newParams.page = "1";
    }
    dispatch(setParams(newParams))
  };

  const validationSchema = Yup.object().shape({
    pageSize: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      pageSize: queryParams.limit || "",
    },
    validationSchema,
    onSubmit: (values: { pageSize: string }) => {
      dispatch(updateParams({ limit: values.pageSize, page: "1" }));
    },
  });


  if (isError) {
    const errorMessage = 'An error occurred';
    add({
      title: errorMessage,
      name: errorMessage,
      theme: "danger"
    });
  }
  return (
    <div className="flex items-center justify-between w-full py-4 ">
      <div className="flex items-center h-full gap-8 grow">
        <PageTitle title="Staffs" />
        <div className="w-1/2 grid grid-cols-2 gap-5">
          <SearchField
            handleChange={searchHandler}
            handleKeyPress={keyPressHandler}
            searchCallBack={searchCallBack}
          />
          <SelectField
            loading={isLoading}
            placeholder="Positions"
            options={selectOptions}
            onChange={positionCallBack}
          />
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <form onSubmit={formik.handleSubmit} className="w-[100px]">
          <Input
            name="pageSize"
            placeholder="Size"
            type="number"
            value={formik.values.pageSize}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            rightContent={
              <Button onClick={() => formik.handleSubmit()} view="flat" type="submit">
                <Icon data={ArrowsRotateLeft} size={16} />
              </Button>
            }
          />
        </form>
        <ActionButton onClick={() => router.push("/create")} title="Add" icon={Plus} />
      </div>
    </div >
  );
}

export default TableHeader;
