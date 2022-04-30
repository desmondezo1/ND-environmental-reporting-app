import multer from 'multer';
const cloudinary = require('cloudinary').v2;
require('dotenv').config();


var signature = cloudinary.utils.api_sign_request({
    timestamp: new Date().getTime(),
    eager: 'w_400,h_300,c_pad|w_260,h_200,c_crop',
    public_id: ''}, process.env.API_SECRET);


export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb' // Set desired value here
        }
    }
}



// export async function createImageUpload() {
//   const timestamp = new Date().getTime()
//   const signature = await cloudinary.utils.api_sign_request(
//     {
//       timestamp,
//     },
//     process.env.CLOUDINARY_SECRET
//   )
//   return { timestamp, signature }
// }

export default async function handler(req, res) {
    if (req.method === 'POST') {

        let timestamp = new Date().getTime();
        let response = await fetch(
            "https://api.cloudinary.com/v1_1/noble-one-projects/image/upload",
            {
             method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
             body:JSON.stringify({
              file: req,
              api_key: "833131282411659",
              timestamp,
              public_id: "temp/image",
              signature
            })
           }).then((resp) =>{
              console.log("sent");
            res.status(200).json({ resp });
          });
        
      } else {
        // Handle any other HTTP method
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
      }

  }
  