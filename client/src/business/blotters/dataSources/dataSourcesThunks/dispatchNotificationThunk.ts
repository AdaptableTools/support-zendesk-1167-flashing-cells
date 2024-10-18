import { AppThunk } from '#/business/configureStore';

type MessageType = 'Success' | 'Info' | 'Warning' | 'Error';

export function dispatchNotificationThunk({ type, message }: { type: MessageType; message: string }): AppThunk {
  return (_dispatch, _getState, { gridApiManager }): void => {
    const adaptableApi = gridApiManager.getAdaptableApi();

    switch (type) {
      case 'Success':
        return adaptableApi?.systemStatusApi.setSuccessSystemStatus(message);
      case 'Info':
        return adaptableApi?.systemStatusApi.setInfoSystemStatus(message);
      case 'Warning':
        return adaptableApi?.systemStatusApi.setWarningSystemStatus(message);
      case 'Error':
        return adaptableApi?.systemStatusApi.setErrorSystemStatus(message);
    }
  };
}
