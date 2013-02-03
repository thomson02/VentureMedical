var util = require('util');
var _ = require('underscore');

exports.configureRoutes = function(app, User, MetaData) {

    // SUPPORTING FUNCS
    var getUsers = function(req, res){
        User.find(function(err, users){
            if (err) {
                console.log(err);
                return res.json({ result: "Failed" });
            }

            _.each(users, function(user){
                user.attendance = [user.attendance[user.attendance.length - 1]]; // reduce size of data transfer by just sending the most recent
            });

            return res.json({ result: "Success", users: users });
        });
    };

    // ROUTES
    app.get('/api/users', getUsers);

};