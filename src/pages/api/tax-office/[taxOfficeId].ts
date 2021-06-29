import getHandler from 'src/middelware/handler';
import deleteTaxOfficeByIdHandler from 'src/modules/tax-office/handlers/deleteTaxOfficeByIdHandler';
import getTaxOfficeByIdHandler from 'src/modules/tax-office/handlers/getTaxOfficeByIdHandler';
import updateTaxOfficeByIdHandler from 'src/modules/tax-office/handlers/updateTaxOfficeByIdHandler';

export default getHandler()
  .get(getTaxOfficeByIdHandler)
  .put(updateTaxOfficeByIdHandler)
  .delete(deleteTaxOfficeByIdHandler);
