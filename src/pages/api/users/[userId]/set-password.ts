import handler from 'next-connect';
import updatePasswordHandler from 'src/modules/user/handlers/updatePasswordHandler';

export default handler().put(updatePasswordHandler);
