import { Request, Response } from "express";
import SecurityScanResult from "../models/results.model";


export const getResults = async( req: Request, res: Response ) => {
    try {
        const results = await SecurityScanResult.findAll();
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal server error, contact API administrator'
        });
    }
}

export const getResult = async( req: Request, res: Response ) => {
    const { id } = req.params;
    try {
        const result = await SecurityScanResult.findByPk(id);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({
                msg: `Result with id ${id} not found`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal server error, contact API administrator'
        });
    }
}

export const createResult = async( req: Request, res: Response ) => {
    const { body } = req;
    try {
        const result = await SecurityScanResult.create({
            status: body.status,
            repositoryName: body.repositoryName,
            findings: body.findings,
            queuedAt: body.queuedAt,
            scanningAt: body.scanningAt,
            finishedAt: body.finishedAt
        });
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal server error, contact API administrator'
        });
    }
}

export const updateResult = async( req: Request, res: Response ) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const result = await SecurityScanResult.update({
            status: body.status,
            repositoryName: body.repositoryName,
            findings: body.findings,
            queuedAt: body.queuedAt,
            scanningAt: body.scanningAt,
            finishedAt: body.finishedAt
        }, {
            where: {
              id
            }
        });
        if ( Number(result) === 1 ) {
            res.json({
                msg: `Result with id ${id} updated`
            })
        } else {
            res.status(404).json({
                msg: `Result with id ${id} not found`
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal server error, contact API administrator'
        });
    }
}

export const deleteResult = async( req: Request, res: Response ) => {
    const { id } = req.params;
    try {
        const result = await SecurityScanResult.destroy({
            where: {
                id
            }
        });
        console.log('Result: ' + result);
        if ( result ) {
            res.json({
                msg: `Result with id ${id} deleted`
            })
        } else {
            res.status(404).json({
                msg: `Result with id ${id} not found`
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal server error, contact API administrator'
        });
    }
}