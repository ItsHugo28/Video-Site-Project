var validator = require('validator');
var db = require("../conf/database");


module.exports = {
    usernameCheck: function (req, res, next) {
        var {username} = req.body;
        username = username.trim();
        if (!validator.isLength(username, {min: 3})) {
            req.flash("error", "Username must be 3 or more characters");
        }
        if (!/[a-zA-Z]/.test(username.charAt(0))) {
            req.flash("error", "Username must begin with a character");
        }
        if (req.session.flash.error) {
            res.redirect('/registration');
        } else {
            next();
        }
    },
    passwordCheck: function (req, res, next) {
            var {password} = req.body;
        var confirmPassword = req.body.confirmPassword;
            password = password.trim();
        confirmPassword = confirmPassword.trim();
        if (password !== confirmPassword) {
            req.flash("error", "Passwords do not match");
        }else if (!validator.isStrongPassword(password, {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            })) {
                req.flash("error", "Password does not meet requierments");
            }
            if (req.session.flash.error) {
                res.redirect('/registration');
            } else {
                next();
            }

    },
    emailCheck: async function (req, res, next) {
        var {email} = req.body;
        email = email.trim();
        if (!validator.isEmail(email, {
                allow_display_name: false,
                require_display_name: false,
                allow_utf8_local_part: true,
                require_tld: true,
                allow_ip_domain: false,
                domain_specific_validation: false,
                blacklisted_chars: '',
                host_blacklist: []
            }
        )) {
            req.flash("error", "Password does not meet requierments");
        }
        if (req.session.flash.error) {
            res.redirect('/registration');
        } else {
            next();
        }
    },
    isUsernameUnique: async function (req, res, next) {
        var {username} = req.body;
        try {
            var [rows, fields] = await db.execute(`select id from users where username=?;`, [username]);
            if (rows && rows.length > 0) {
                req.flash("error", `${username} is already taken`);
                return req.session.save(function (err) {
                    return res.redirect('/registration');
                });
            } else {
                next();
            }
        } catch (error) {
            next(error)
        }
    },
    isEmailUnique: async function (req, res, next) {
        var {email} = req.body;
        try {
            var [rows, fields] = await db.execute(`select id from users where email=?;`, [email]);
            if (rows && rows.length > 0) {
                req.flash("error", `${email} is already taken`);
                return req.session.save(function (err) {
                    return res.redirect('/registration');
                });
            } else {
                next();
            }
        } catch (error) {
            next(error)
        }

    }

}