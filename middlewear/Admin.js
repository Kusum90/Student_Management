exports.adminmiddlewear = (req, res, next) => {
    console.log(req.user);
    if (req.user.UserRole === 'Admin') {
        console.log("User is admin");
        next();
    } else {
        console.log("User is not authorized");
        return res.json({
            status: 0,
            message: 'Unauthorized'
        });
    }
};


exports.hrmiddlewear = (req, res, next) => {
    console.log(req.user);
    if (req.user.UserRole === 'Hr') {
        console.log("User is Hr");
        next();
    }
    else {
        console.log("User is not authorized");
        return res.json({
            status: 0,
            message: 'Unauthorized'
        });
    }
};

exports.developermiddlewear = (req, res, next) => {
    console.log(req.user);
    if (req.user.UserRole === 'Developer') {
        console.log("User is Developer");
        next();
    }
    else {
        console.log("User is not authorized");
        return res.json({
            status: 0,
            message: 'Unauthorized'
        });
    }
};

exports.internmiddlewear = (req, res, next) => {
    console.log(req.user);
    if (req.user.UserRole === 'Intern') {
        console.log("User is Intern");
        next();
    }
    else {
        console.log("User is not authorized");
        return res.json({
            status: 0,
            message: 'Unauthorized'
        });
    }
}




