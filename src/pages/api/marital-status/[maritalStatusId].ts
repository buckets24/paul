import handler from 'next-connect';
import deleteMaritalStatusByIdHandler from 'src/modules/marital-status/handlers/deleteMaritalStatusByIdHandler';
import getMaritalStatusByIdHandler from 'src/modules/marital-status/handlers/getMaritalStatusByIdHandler';
import updateMaritalStatusByIdHandler from 'src/modules/marital-status/handlers/updateMaritalStatusByIdHandler';

export default handler()
  .get(getMaritalStatusByIdHandler)
  .put(updateMaritalStatusByIdHandler)
  .delete(deleteMaritalStatusByIdHandler);
