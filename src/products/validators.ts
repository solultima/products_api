import { Request, Response, NextFunction } from 'express';
import { validate } from 'uuid';

export const updateStockValidator = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const stock = req.body.stock;
    if (id && stock && typeof stock === 'number' && stock >= 0) {
        console.log(JSON.stringify(req.body));
        return next();
    } else {
        res.status(400).send({ error: 'either id or stock missing or invalid' });
    }
}

/*export const updateStockValidator = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const stock = req.body.stock;
    if (id && validate(id) && stock && typeof stock === 'number' && stock >= 0) {
        console.log(JSON.stringify(req.body));
        return next();
    } else {
        res.status(400).send({ error: 'either id or stock missing or invalid (validator)' });
    }
}
*/
