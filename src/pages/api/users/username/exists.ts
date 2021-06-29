import handler from 'next-connect';
import getUserByUsernameHandler from 'src/modules/user/handlers/getUserByUsernameHandler';

export default handler().get(getUserByUsernameHandler);
