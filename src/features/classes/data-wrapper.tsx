"use client";
import React, { FC } from "react";
import LessonRoster from "./lesson-rosters";

interface Props {
  classId: string;
}

const DataWrapper: FC<Props> = ({ classId }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Lesson Roster</h2>
      <div className="mt-5">
        <LessonRoster classId={classId} />
      </div>
    </div>
  );
};

export default DataWrapper;
