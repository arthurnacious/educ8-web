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
import { Edit, EllipsisVertical, Eye, Pickaxe } from "lucide-react";

interface Props {
  slug: string;
  onEditClick?: (slug: string) => void;
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
          onClick={() => (onEditClick ? onEditClick(slug) : undefined)}
        >
          <Edit className="size-4 mr-2" /> Quick Edit
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href={`/subjects/${slug}/edit`}>
            <Pickaxe className="size-4 mr-2" /> Advanced Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href={`/subjects/${slug}`}>
            <Eye className="size-4 mr-2" /> View
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
