import handler from 'next-connect';
import createUserHandler from 'src/modules/user/handlers/createUserHandler';
import deleteMultipleUsersHandler from 'src/modules/user/handlers/deleteMultipleUsersHandler';
import getUsersHandler from 'src/modules/user/handlers/getUsersHandler';

export default handler().get(getUsersHandler).post(createUserHandler).delete(deleteMultipleUsersHandler);
