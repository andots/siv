import type { Component } from "solid-js";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { useUpdaterState } from "~/store";

const UpdaterDialog: Component = () => {
  const { updaterState } = useUpdaterState();

  return (
    <Dialog open={updaterState.getters.shouldUpdate()}>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New version is now available!</DialogTitle>
          <DialogDescription>Would you like to install it now?</DialogDescription>
          <div>
            <p>Release Note</p>
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button>No</Button>
          <Button>Yes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdaterDialog;
