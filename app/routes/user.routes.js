module.exports = (app) => {
    const user = require('../controllers/user.controller');
    // Create a new Note
    app.post('/signup', user.create);
    
}