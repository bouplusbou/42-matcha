const cloudinary = require('../tools/Cloudinary')
const unsplash = require('./unsplash');
const Log = require('../tools/Log');

const SeedCloudinary = async () => {
    try {
        Log.log(`***** Cloudinary Seed *****`, `blue`);
        Log.log(`Uploading woman pictures...`)
        const womanPic = unsplash.arrWoman;
        for (i = 0; i < womanPic.length; i++) {
            await cloudinary.uploader.upload(womanPic[i], { public_id: `womanSeed/${i}`})
        }
        Log.log(`Woman pictures successfully uploaded.`, `green`);
        Log.log(`Uploading man pictures...`)
        const manPic = unsplash.arrMan;
        for (i = 0; i < manPic.length ; i++) {
            await cloudinary.uploader.upload(manPic[i], { public_id: `manSeed/${i + womanPic.length}`})
        }
        Log.log(`Man pictures successfully uploaded.`, `green`);
        Log.log(`Cloudinary seeding complete !`, `blue`)
        process.exit(0)
    } catch (error) {
        Log.log(error, `red`);
        Log.log(`Terminating seeding process.`, `red`);
        process.exit(1);
    }
}

    SeedCloudinary();