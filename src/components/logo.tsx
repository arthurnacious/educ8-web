import { cn } from "@/lib/utils";
import { FC } from "react";

type Props = React.HTMLAttributes<HTMLDivElement>;

const Logo: FC<Props> = ({ className, ...props }) => {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <div className="flex items-center justify-center size-10 bg-gradient-to-r from-teal-600 to-teal-950 text-white text-4xl font-bold rounded-lg shadow-lg">
        S
      </div>
      <span className="text-2xl font-semibold text-gray-900 dark:text-white">
        Schooley
      </span>
    </div>
  );
};

export default Logo;
