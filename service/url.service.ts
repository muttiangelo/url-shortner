import { PrismaClient, type Url } from '@prisma/client';
import type { UrlDto } from '../model/url.model';
import { UrlUtil } from '../util/url.util';

const prisma = new PrismaClient();

export async function getUrls(): Promise<Url[]> {
    return await prisma.url.findMany();
}

// TODO: Study the possibility of making the unique code the ID. Why not? 
export async function getUrlByUniqueCode(id: string): Promise<UrlDto> {
    const url = await prisma.url.findUnique({
        where: {
            id: id
        }
    });

    if(!url){
        return null!;
    }

    return {
        id: url.id,
        url: url.url,
        shortUrl: process.env.FRONTEND_URL + url.uniqueCode,
        createdAt: url.dateAdded.toISOString(),
        updatedAt: url.dateExpires.toISOString()
    };
}

export async function createUrl(url: string): Promise<string> {
    const uniqueCode = UrlUtil.generateShortUrlCode();

    const dateExpires = new Date();
    dateExpires.setFullYear(new Date().getFullYear() + 1);

    const newUrl = await prisma.url.create({
        data: {
            url: url,
            uniqueCode: uniqueCode,
            dateExpires: dateExpires
        }
    });
    return process.env.FRONTEND_URL + newUrl.uniqueCode;
}
