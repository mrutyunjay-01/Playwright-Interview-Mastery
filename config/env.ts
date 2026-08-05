import dotenv from 'dotenv';
dotenv.config();

function getEnvVariable(key: string): string {
    const value = process.env[key]; 
    if (!value || value===''){
        throw new Error(`Missing Environment Variable: ${key}`);
    }
    return value;
}

export const ENV = {
    NORMAL_USER: getEnvVariable('NORMAL_USER'),
    PASSWORD: getEnvVariable('PASSWORD'),
    LOCKED_USER: getEnvVariable('LOCKED_USER')
};