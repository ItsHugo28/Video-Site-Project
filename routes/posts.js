var express = require('express');
var router = express.Router();
var multer = require("multer");
var db = require("../conf/database")
const {makeThumbnail, getPostById, getCommentsForPostById, getPostsForUserBy} = require("../middleware/post");
const {isLoggedIn} = require("../middleware/auth");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/videos/uploads");
    },
    filename: function (req, file, cb) {
        var fileExt = file.mimetype.split("/")[1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExt}`);
    }
});

const upload = multer({storage: storage})
router.post("/create", isLoggedIn, upload.single("uploadVideo"), makeThumbnail, async function (req, res, next) {
    var {title, description} = req.body;
    var {path, thumbnail} = req.file;
    var {userId} = req.session.user;

    try {
        var [insertResult, _] = await db.execute(
            `INSERT INTO posts (title, description, video, thumbnail, fk_userid) VALUE (?,?,?,?,?);`, [title, description, path, thumbnail, userId]);
        if (insertResult && insertResult.affectedRows) {
            req.flash("success", 'Your post was created!');
            return req.session.save(function (error) {
                if (error) next(error);
                return res.redirect(`/`);
            });
        } else {
            next(new Error('Post could not be created'));
        }
    } catch (error) {
        next(error);
    }
});

router.get("/:id(\\d+)",getPostById,getCommentsForPostById, function (req, res) {
    res.render('viewpost', {title: `View Post ${req.params.id}`, js: ["viewpost.js"]});
})



router.get("/search", async function (req, res, next) {
    var {searchValue} = req.query;
    try {
        var [rows, _] = await db.execute(`select id,title,thumbnail, concat_ws(' ', title, description) as 
    haystack 
    from posts 
    having haystack like ?;`,
            [`%${searchValue}%`]);

        if (rows && rows.length == 0) {

        } else {
            res.locals.posts = rows;
            return res.render('index');
        }

    } catch (error) {
        next(error)
    }
    res.end();

});

router.get("/delete/:id", async function (req, res, next) {
    var id = req.params.id;

    try {
        await db.execute(`DELETE FROM comments WHERE fk_postId = ?`, [id]);

        var [deleteResult, _] = await db.execute(
            `DELETE FROM posts WHERE id = ?`,
            [id]
        );
        if (deleteResult && deleteResult.affectedRows) {
            req.flash("success", "Your post was deleted");
            return res.redirect("/");
        } else {
            req.flash("error", "Failed to delete the post");
            return res.redirect("/");
        }
    } catch (error) {
        next(error);
    }
});


module.exports = router;