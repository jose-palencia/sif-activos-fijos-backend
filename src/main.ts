import 'dotenv/config';
import express from 'express';

const PORT = process.env.APP_PORT || 3001;

const app = express();

app.listen(PORT, () => {
    console.log(`Server running in port: ${PORT}`);
});