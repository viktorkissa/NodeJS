module.exports = {
    MONGODB_URI: `mongodb+srv://${process.env.MONGODB_NAME}:${process.env.MONGODB_PASSWORD}@cluster0.z75lf.mongodb.net/shop`,
    SESSION_SECRET: 'some secret value',
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    EMAIL_FROM: 'nodejs-courses@wfm.com',
    BASE_URL: 'http://localhost:3000'
}