"use client";
import React, { FC } from "react";
import LessonRoster from "./lesson-rosters";

interface Props {
  courseId: string;
}

const DataWrapper: FC<Props> = ({ courseId }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Lesson Roster</h2>
      <div className="mt-5">
        <LessonRoster courseId={courseId} />
      </div>
    </div>
  );
};

export default DataWrapper;
