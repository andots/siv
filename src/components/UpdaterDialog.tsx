import { createSignal, type Component, createEffect } from "solid-js";

import { relaunch } from "@tauri-apps/api/process";
import { installUpdate } from "@tauri-apps/api/updater";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { logError } from "~/lib/utils";
import { useUpdaterState } from "~/store";

const UpdaterDialog: Component = () => {
  const { updaterState } = useUpdaterState();
  const [open, setOpen] = createSignal<boolean>(false);

  createEffect(() => {
    setOpen(updaterState.getters.shouldUpdate());
  });

  const handleNo = () => {
    setOpen(false);
  };

  const handleYes = () => {
    installUpdate().then(relaunch).catch(logError);
  };

  return (
    <Dialog open={open()}>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            New version v{updaterState.getters.newVersion()} is now available!
          </DialogTitle>
          <DialogDescription>
            You have v{updaterState.getters.currentVersion()}. Would you like to update it now?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={handleNo}>
            No
          </Button>
          <Button variant="default" onClick={handleYes}>
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdaterDialog;
