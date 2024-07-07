import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/stream/:id', async (req, res) => {
    const { id } = req.params;
    const apiUrl = `https://spapi.zee5.com/singlePlayback/getDetails/secure?channel_id=${id}&device_id=d1809ddc-e8a0-4d2b-bf99-b9af6d653b51&platform_name=desktop_web&translation=en&user_language=en,hi,hr&country=IN&state=DL&app_version=4.7.4&user_type=premium&check_parental_control=false&gender=Unknown&uid=d1b44997-023b-4dbf-ab11-8da3d6602075&ppid=d1809ddc-e8a0-4d2b-bf99-b9af6d653b51&version=12`;
    const token = { "x-access-token": process.env.X_ACCESS_TOKEN, "Authorization": process.env.AUTHORIZATION, "x-dd-token": process.env.X_DD_TOKEN };
    const response = await axios.post(apiUrl, token);
    console.log(response.data)
    const videoToken = response.data.keyOsDetails.video_token;
    if (videoToken) {
        console.log('Video token found:', videoToken);
        res.redirect(videoToken);
    } else {
        console.error('Video token not found in response');
        res.send('Video token not found');
    }
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
});