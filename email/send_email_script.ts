import * as nodeMailer from 'nodemailer';

import * as mongoose from 'mongoose';



async function connect (uri) {
    await mongoose.connect(uri)
    .then(() => console.log('Success'))
    .catch((err) => console.log('Failure in mongo Connection'));
}


const schema = new mongoose.Schema({
    jsonData: Object
})

async function getLatestReport (condition, projection, options) {
    let reports = await mongoose.model('reports', schema).findOne(condition, projection, options)
    .then((data) => data)
    .catch(err => err);
    return reports;
}

async function sendMail () {
    const uri = process.env.MONGO_URL
    await connect(uri);
    const options = {sort: {_id: -1}};
    const projection = {
        "jsonData.Results": 1
    }
    let latestFile = await getLatestReport({}, projection, options);
    latestFile = JSON.parse(JSON.stringify(latestFile));
    console.log({jsonObject: latestFile, description: "Latest record of backend reports"});

    var transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER_NAME,
          pass: process.env.EMAIL_PASSWORD
        }
      });

      const mailOptions = {
        from: process.env.FROM_MAIL,
        to: process.env.ADMIN_MAIL,
        subject: 'Mongo Latest Report ',
        text: JSON.stringify(latestFile)
      }

      transporter.sendMail(mailOptions, (error, info) => {
        if (error)
            console.log(error)
        else 
            console.log("Email sent "+info.response);
      })
}

sendMail();
