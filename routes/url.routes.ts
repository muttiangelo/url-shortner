import express from 'express';
import * as urlService from '../service/url.service.ts';

const router = express.Router();

router.get('/urls', urlService.getUrls);
router.get('/url/:id', urlService.getUrlById);
router.post('/url', urlService.createUrl);

export default router;