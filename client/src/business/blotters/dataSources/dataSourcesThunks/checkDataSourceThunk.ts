import { AppThunk } from '#/business/configureStore';
import { Position } from '../dataSourcesModel';

export function checkDataSourceThunk(): AppThunk {
  return (dispatch, _getState, { thunks: { dispatchNotificationThunk }, gridApiManager }): void => {
    const agGridApi = gridApiManager.getAgGridApi();

    const sodColId: keyof Pick<Position, 'sodPosition'> = 'sodPosition';

    let sodRecieved = false;

    agGridApi?.forEachNode((node) => {
      if (!node.group) {
        if (
          agGridApi.getCellValue({
            colKey: sodColId,
            rowNode: node,
          }) !== 0
        ) {
          sodRecieved = true;
        }
      }
    });

    if (!sodRecieved) {
      dispatch(
        dispatchNotificationThunk({
          type: 'Warning',
          message: 'Initial position data not availalble. Position may be impacted.',
        }),
      );
    }
  };
}
