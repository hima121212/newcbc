import bcrypt from 'bcrypt'; // bcrypt ආනයනය කරනවා මුරපද හැෂ් කිරීම සඳහා.
import User from '../models/user.js';


import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'; // JWT ආනයනය කරනවා පරිශීලකයාගේ තොරතුරු සුරක්ෂිත කිරීම සඳහා.

dotenv.config();

// දත්ත සමුදායෙන් පරිශීලකයා ලබා ගැනීම find() භාවිතයෙන්
export function getuser(req, res) {
   
    User.find().then((userList) => {
    
        res.json({
            list: userList // userList එක JSON ආකාරයෙන් පිළිතුර යවනවා.
        });
        
    
    });
}

// පරිශීලක නිර්මාණය කිරීමේ ක්‍රියාවලිය හසුරුවන ෆන්ක්ෂන් එක
export function createUser(req, res) {
    // ඉල්ලීමේ බොඩියෙන් නව පරිශීලක ඩේටා ලබා ගැනීම
    const newUserData = req.body;

    // නව පරිශීලකයා "admin" වර්ගයේ එකක් දැයි පරීක්ෂා කිරීම
    if (newUserData.type == "admin") {
        // සත්‍යාපිත පරිශීලකයෙකු නොමැති බව (req.user null වීම) පරීක්ෂා කිරීම
        if (req.user == null) {
            // පරිපාලක ලෙස ලොගින් වීම අවශ්‍ය බව දන්වන JSON පිළිතුර යැවීම
            res.json({
                message: "please login as administor to create admin account"
            });
            // තවදුරටත් ක්‍රියාවලිය නවත්වා ෆන්ක්ෂන් එකෙන් ඉවත් වීම
            return;
        }

        // සත්‍යාපිත පරිශීලකයා පරිපාලකයෙකු නොවන බව පරීක්ෂා කිරීම
        if (req.user.type != "admin") {
            // පරිපාලක ගිණුම් නිර්මාණයට පරිපාලක ලොගින් අවශ්‍ය බව දන්වන JSON පිළිතුර යැවීම
            res.json({
                message: "please login as administor to create admin account"
            })
            return;
            
        }
    }


newUserData.password = bcrypt.hashSync(newUserData.password, 10); // මුරපදය bcrypt භාවිතයෙන් හැෂ් කරනවා.

    const user = new User(newUserData); // ඉල්ලීමේ බොඩිය භාවිතයෙන් නව පරිශීලක වස්තුවක් සාදනවා.
    user.save().then(
        () => {
            res.json({
                message: "User Created", // සාර්ථක පණිවිඩයක් JSON ආකාරයෙන් යවනවා.
            });
        }
    ).catch(() => {
        res.json({
            message: "Error", // දෝෂ පණිවිඩයක් JSON ආකාරයෙන් යවනවා.
        });
    });
}




export function loginUser(req, res) {
    // ඊමේල් එක භාවිතා කරලා ඩේටාබේස් එකේ යූසර් හොයනවා
    User.find({ email: req.body.email }).then((userList) => {
        // යූසර්ලා හමු නොවුණොත්
        if (userList.length == 0) {
            res.json({
                message: "User Not Found" // පරිශීලකයා හමු නොවුණු පණිවිඩයක් JSON ආකාරයෙන් යවනවා
            });
        } else {
            // පළවෙනි යූසර් එක ගන්නවා
            const user = userList[0];

            // ලබා දුන් මුරපදය ඩේටාබේස් එකේ හැෂ් කරපු මුරපදය එක්ක සසඳනවා
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);

            // මුරපදය හරි නම්
            if (isPasswordCorrect) {
                // JWT ටෝකනයක් හදනවා, යූසර්ගේ තොරතුරු එක්ක
                const token = jwt.sign({
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    isBlocked: user.isBlocked,
                    type: user.type,
                    profilepicture: user.profilepicture
                }, process.env.SECRET);

                // සාර්ථක ලොගින් පණිවිඩයක් එක්ක ටෝකනය යවනවා
                res.json({
                    message: "Login Success",
                    token: token,
                    user:{
                        firstname: user.firstname,
                        lastname: user.lastname,
                        type: user.type,
                        profilepicture: user.profilepicture,
                        email: user.email

                    }

                    
                });
            }else
            {
                // මුරපදය වැරදි නම් දෝෂ පණිවිඩයක් යවනවා
                res.json({
                    message: "Password Incorrect"
                });
            }
        }
    });
}



export function isAdmin(req, res) {
    // පරිශීලකයා පරිපාලකයෙකුද යන්න පරීක්ෂා කරනවා
    if (req.user==null) {
        return false;


 
    }

    if(req.user.type != "admin") {
        return false;
    }

    return true;
}


export function isCustomer(req, res) {
    // පරිශීලකයා පාරිභෝගිකයෙකුද යන්න පරීක්ෂා කරනවා
    if (req.user==null) {
        return false;
    }

    if(req.user.type != "customer") {
        return false;
    }

    return true;


}












 //admin@admin @ admin --admin

 // himashguruge@gmail.com @ 123 -- customer

 /*
 {

    "email": "himashguruge@gmail.com",
    "password": "123"
}
 */