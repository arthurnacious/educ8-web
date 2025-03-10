import { PackageOpen } from "lucide-react";
import React, { FC, ReactNode } from "react";
interface Props {
  size?: number;
  children?: ReactNode;
}

const EmptyData: FC<Props> = ({ children, size = 100 }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg shadow-sm">
      <PackageOpen size={size} className=" text-gray-400" />
      {children}
    </div>
  );
};

export default EmptyData;
