import handler from 'next-connect';
import createMaritalStatusHandler from 'src/modules/marital-status/handlers/createMaritalStatusHandler';
import deleteMultipleMaritalStatusHandler from 'src/modules/marital-status/handlers/deleteMultipleMaritalStatusHandler';
import getMaritalStatusHandler from 'src/modules/marital-status/handlers/getMaritalStatusHandler';

export default handler()
  .get(getMaritalStatusHandler)
  .post(createMaritalStatusHandler)
  .delete(deleteMultipleMaritalStatusHandler);
