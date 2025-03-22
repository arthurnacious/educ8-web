import { DataTable } from "@/components/data-table";
import React, { FC } from "react";
import { Enrollment, Session } from "../../types";
import { sessionsColumns } from "../columns/sessions-columns";

type Props = {
  enrollments: Enrollment[];
  sessions: Session[];
  removeStudents: (studentIds: string[]) => void;
  isPending?: boolean;
};

const AttendanceDataTable: FC<Props> = ({
  enrollments,
  sessions,
  removeStudents,
  isPending,
}) => (
  <DataTable
    delete={{
      onDelete: (rows) => {
        const idsArray = rows.map(({ original: { studentId } }) => studentId);
        removeStudents(idsArray);
      },
      deleteIsDisabled: isPending,
    }}
    columns={sessionsColumns({ sessions: sessions })}
    data={enrollments}
  />
);

export default AttendanceDataTable;
