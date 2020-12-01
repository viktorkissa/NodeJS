const keys = require('../keys')

module.exports = function(email, token) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Resset password!',
        html: `
            <h1>Do You forgot password?</h1>
            <p>If not just ignore this mail</p>
            <p>Else click this link:</p>
            <p><a href="${keys.BASE_URL}/auth/password/${token}">Reset password</a></p>
            <hr />
            <a href="${keys.BASE_URL}">Go to store</a>
        `
    }
} 