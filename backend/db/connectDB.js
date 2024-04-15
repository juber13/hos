import mongoose from "mongoose";


const connectDB = async (req, res) => {
    try {

        mongoose.connect(process.env.DB_URI).then(() => {
            console.log('DB Connected')
        }).catch(err => {
            console.log(err)
        })

    } catch (error) {
        console.log("DB Error : " + error)
    }
}

export default  connectDB;