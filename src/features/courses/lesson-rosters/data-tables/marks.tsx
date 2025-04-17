import { DataTable } from "@/components/data-table";
import React, { FC } from "react";
import { Enrollment, Field, Session } from "../../types";
import { marksColumns } from "../columns/marks-columns";

type ClassData = {
  id: string;
  name: string;
  sessions: Session[];
  enrollments: Enrollment[];
  marks: Field[];
};

interface Props {
  data: ClassData;
  removeStudents: (rows: string[]) => void;
  isPending?: boolean;
}

const MarksDataTable: FC<Props> = ({ data, removeStudents, isPending }) => {
  const transformedData: Enrollment[] = data.enrollments.map((enrollment) => {
    const studentMarks = data.marks
      .filter((mark) => mark.studentId === enrollment.studentId)
      .reduce((acc, mark) => {
        acc[`mark.${mark.id}`] = mark.amount; // Attach marks dynamically
        return acc;
      }, {} as Record<string, number>);

    return {
      ...enrollment,
      ...studentMarks,
    };
  });

  return (
    <DataTable
      delete={{
        onDelete: (rows) => {
          const idsArray = rows.map(({ original: { studentId } }) => studentId);
          removeStudents(idsArray);
        },
        deleteIsDisabled: isPending,
      }}
      columns={marksColumns({ marks: data.marks })}
      data={transformedData}
    />
  );
};

export default MarksDataTable;
