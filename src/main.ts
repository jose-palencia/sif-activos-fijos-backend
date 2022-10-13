import 'dotenv/config';
import App from './app'

//Iniciar la aplicación
App.listen(process.env.APP_PORT as unknown as number | 3001);