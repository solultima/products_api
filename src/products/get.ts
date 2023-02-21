import { Request, Response } from 'express';

const getList = (req: Request, res: Response) => {
    res.send([]);
}

const getProductByID = (req: Request, res: Response) => {
    res.send({ id: req.params.id });
}

export {
    getList,
    getProductByID
}