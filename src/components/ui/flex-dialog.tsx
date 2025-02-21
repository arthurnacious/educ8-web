"use client"

import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import useDeviceDetect from './hooks/useDeviceDetect';

const FlexDialog = ({
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
            {description && <DrawerDescription>{description}</DrawerDescription>}
          </DrawerHeader>
          {content || children}
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
        {content || children}
      </DialogContent>
    </Dialog>
  );
};

export default FlexDialog;