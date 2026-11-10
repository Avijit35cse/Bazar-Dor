import { Product } from '@/types/allTypes';

export const getProducts = async() : Promise<Product[]>=>{

        const response = await fetch("https://openapi.programming-hero.com/api/bazardor/products")
        if(!response.ok){
            throw new Error("Failed to fetch products")
        }
        
        const products : Product[] = await response.json()
        return products
    }

export default getProducts;