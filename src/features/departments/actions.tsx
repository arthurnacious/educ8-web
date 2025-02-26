"use client";
import React, { FC } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Edit, EllipsisVertical, Eye } from "lucide-react";

interface Props {
  slug: string;
  onEditClick: (slug: string) => void;
}

const Actions: FC<Props> = ({ slug, onEditClick }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-8 p-0">
          <EllipsisVertical className="size-4 mr-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => onEditClick(slug)}
        >
          <Edit className="size-4 mr-2" /> Edit
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href={`departments/${slug}`}>
            <Eye className="size-4 mr-2" /> View
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
