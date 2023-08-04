
exports.signup = async(req, res) => {
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            phoneNumber,
        } = req.body

        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp || !phoneNumber) {
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        if(password !== confirmPassword) {
            return res.status(401).json({
                success:false,
                message:"consfirm password could not match"
            })
        }

    } catch {

    }
}