import connection from '../config/connectDB';

const middlewareController = async(req, res, next) => {
    // xác nhận token
    const auth = req.cookies.auth;
    // console.log("object",auth)
    if (!auth) return res.status(400).send({
        message:"Please logins",
        status:false
    });
    const [rows] = await connection.execute('SELECT `token`, `status` FROM `users` WHERE `token` = ? AND `veri` = 1', [auth]);
 
    if(!rows || rows===null || rows==[]) {
        res.clearCookie("auth");
        return res.end();
    };

    if (auth == rows[0].token && rows[0].status == '1') {
        next();
    } else {
        return res.status(400).send({
            message:"Login user access this step",
            status:false
        });
    }
    try {
    } catch (error) {
        return res.status(400).send({
            message:"Please login",
            status:false
        });;
    }
}

export default middlewareController;