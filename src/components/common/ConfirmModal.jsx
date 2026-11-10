import Modal from "./Modal";
import Button from "./Button";

export default function ConfirmModal({ open, onClose, onConfirm, title = "Are you sure?", message, confirmLabel = "Delete", tone = "danger" }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="ghostLight" onClick={onClose}>Cancel</Button>
          <Button
            variant={tone}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <p className="text-white/70 text-sm leading-relaxed">{message}</p>
    </Modal>
  );
}
