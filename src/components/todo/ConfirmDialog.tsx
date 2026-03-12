import { useEffect, useRef } from "react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/** Native dialog for confirmations */
const ConfirmDialog = ({
  open, title, message, confirmLabel = "Delete", destructive = true, onConfirm, onCancel,
}: ConfirmDialogProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onCancel}
      className="m-auto max-w-sm rounded-xl bg-background p-6 text-foreground backdrop:bg-foreground/50 backdrop:backdrop-blur-sm"
    >
      <h2 className="text-base font-medium">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{message}</p>
      <div className="mt-5 flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="rounded-md px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors duration-200 hover:bg-secondary"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className={`rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 ${
            destructive
              ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          {confirmLabel}
        </button>
      </div>
    </dialog>
  );
};

export default ConfirmDialog;
