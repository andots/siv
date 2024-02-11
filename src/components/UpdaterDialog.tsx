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
  const [disabled, setDisabled] = createSignal<boolean>(false);

  createEffect(() => {
    setOpen(updaterState.getters.shouldUpdate());
  });

  const handleNo = () => {
    setDisabled(true);
    setOpen(false);
  };

  const handleYes = () => {
    setDisabled(true);
    setOpen(false);
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
          <Button type="button" variant="outline" onClick={handleNo} disabled={disabled()}>
            No
          </Button>
          <Button
            type="button"
            variant="default"
            onClick={handleYes}
            autofocus
            disabled={disabled()}
          >
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdaterDialog;
