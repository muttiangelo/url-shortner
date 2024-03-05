import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUrls = async (req: any, res:any) => {
    const urls = await prisma.url.findMany();
    res.json(urls);
};

export const getUrlById = async (req: any, res:any) => {
    const { id } = req.params;
    const url = await prisma.url.findUnique({
        where: {
            id: id
        }
    });
    res.json(url);
};

export const createUrl = async (req: any, res:any) => {
    const { url } = req.body;
    const urlId = await prisma.url.create({
        data: {
            url: url
        }
    });
    res.json(urlId.id);
};