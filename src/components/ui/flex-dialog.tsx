"use client";

import React, { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import useDeviceDetect from "@/hooks/use-device-detect";
import { DialogProps } from "@radix-ui/react-dialog";

interface FlexDialogProps extends DialogProps {
  trigger?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  content?: React.ReactNode;
}

const FlexDialog: FC<FlexDialogProps> = ({
  children,
  trigger,
  title,
  description,
  content,
  ...props
}) => {
  const isMobile = useDeviceDetect();

  if (isMobile) {
    return (
      <Drawer {...props}>
        {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
        <DrawerContent>
          <DrawerHeader>
            {title && <DrawerTitle>{title}</DrawerTitle>}
            {description && (
              <DrawerDescription>{description}</DrawerDescription>
            )}
          </DrawerHeader>
          <div className="mx-5 mb-10">{content || children}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog {...props}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="mb-10">{content || children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default FlexDialog;
