import { NextApiRequest, NextApiResponse } from "next";
import getCurrentUser from "../actions/getCurrentUser";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return res.json('Error');
        }

        const body = await req.body;

        const {
            cateId,
            title,
            imageSrc,
            description,
            level,
            price,
        } = body;

        Object.keys(body).forEach((value: any) => {
            if (!body[value]) {
                NextResponse.error();
            }
        });

        const courses = await prisma.course.create({
            data: {
                title,
                description,
                imageSrc,
                level,
                cateId,
                price: parseInt(price, 10),
            }
        })

        return NextResponse.json(courses);
    } else {
        // Handle any other HTTP method
    }
}