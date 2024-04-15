
const register = async (req, res) => {
    res.status(201).json({
        success: true,
        message: "register successfully"
    })
};


export {register}