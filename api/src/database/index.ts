import { createConnection } from 'typeorm';
import { typeOrmConfig } from '../configurations/database';

const serverConnector = async () => {
  try {
    await createConnection(typeOrmConfig);
    console.log('✅ ✅ ✅ Finished dbseed task. ✅ ✅ ✅\n');
  } catch (error) {
    console.log(error);
  }
};

export default serverConnector;
