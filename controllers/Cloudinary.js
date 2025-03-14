const cloudinary=require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
    api_key: process.env.CLOUDNARY_API_KEY,
    api_secret: process.env.CLOUDNARY_API_SECRET
});
exports.upload=async(req,res)=>{
    //  let result =await cloudinary.Uploader.upload(req.body.image,{
        let result =await cloudinary.v2.uploader.upload(req.body.image,{
        public_id:`${Date.now()}`,
        resource_type:"auto"
     });
     res.json({
        public_id:result.public_id,
        url:result.secure_url
     })
}

exports.remove=async(req,res)=>{

    let image_id=req.body.public_id;
   await cloudinary.v2.uploader.destroy(image_id,(err,result)=>{
        if(err) return res.json({sucess:false,err})
        res.send("ok");
    });}