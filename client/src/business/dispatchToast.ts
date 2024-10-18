export const dispatchToast = (
  id: number,
  message: string,
  status: 'info' | 'success' | 'warning' | 'danger',
  closable = false,
) =>
  document.querySelector('cib-toast')?.dispatchEvent(
    new CustomEvent('notifyToast', {
      detail: {
        status,
        message,
        persistent: false,
        closable,
        id,
      },
    }),
  );
