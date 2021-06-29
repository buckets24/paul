import getHandler from 'src/middelware/handler';
import createTaxOfficeHandler from 'src/modules/tax-office/handlers/createTaxOfficeHandler';
import deleteMultipleTaxOfficesHandler from 'src/modules/tax-office/handlers/deleteMultipleTaxOfficesHandler';
import getTaxOfficesHandler from 'src/modules/tax-office/handlers/getTaxOfficesHandler';

export default getHandler()
  .get(getTaxOfficesHandler)
  .post(createTaxOfficeHandler)
  .delete(deleteMultipleTaxOfficesHandler);
