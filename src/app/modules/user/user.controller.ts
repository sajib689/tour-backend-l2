import type { Request, Response } from "express";


const createUser = async (req: Request, res: Response) => {
    try {

    } catch(error) {
        if(error) {
            res.status(500).json({
                message: 'Error'
            })
        }
    }
}