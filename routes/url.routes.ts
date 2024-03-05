import express from 'express';
import * as urlService from '../service/url.service.ts';

const router = express.Router();

router.get('/urls', async (req, res) => {
    let urls: any[] = await urlService.getUrls();
    return res.json(urls).status(200);
});

router.get('/url/:uniqueCode', async (req, res) => {
    const { uniqueCode } = req.params;

    let url = await urlService.getUrlByUniqueCode(uniqueCode);
    
    if(!url){
        return res.status(400).json({ message: 'Url not found' });
    } 

    return res.json(url).status(200);
});

router.post('/url', async (req, res) => {
    const { url } = req.body;

    let shortenUrl: string = await urlService.createUrl(url);
    return res.json({ shortenUrl: shortenUrl }).status(201);
});

export default router;