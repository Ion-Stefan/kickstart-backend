import prisma from '../db';
import { Request, Response, NextFunction } from 'express';

// get number of products

export const getNumberProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await prisma.product.count();
    res.json({ data: products })

  } catch (error) {
    error.type = 'server';
    next(error);
  }
}

// get all public products

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await prisma.product.findMany()
    res.json({ data: products })

  } catch (error) {
    error.type = 'server';
    next(error);
  }
}

// get all personal products

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id
      },
      include: {
        products: true
      }
    })
    res.json({ data: user.products })

  } catch (error) {
    error.type = 'server';
    next(error);
  }
}

// get product by id

export const getOneProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const product = await prisma.product.findFirst({
      where: {
        id,
        ownerId: req.user.id,
      }
    });
    res.json({ data: product })

  } catch (error) {
    error.type = 'server';
    next(error);
  }
}

// create product

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        ownerId: req.user.id,
      }
    })

    res.json({ data: product })

  } catch (error) {
    error.type = 'server';
    next(error);
  }
}

// update product

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await prisma.product.update({
      where: {
        id: req.params.id
      },
      data: {
        name: req.body.name
      }
    });
    res.json({ data: updated });

  } catch (error) {
    error.type = 'server';
    next(error);
  }
};


// delete product

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await prisma.product.delete({
      where: {
        id: req.params.id,
        ownerId: req.user.id
      }
    });
    res.json({ data: deleted });

  } catch (error) {
    error.type = 'server';
    next(error);
  }
};
