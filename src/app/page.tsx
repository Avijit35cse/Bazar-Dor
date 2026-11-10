import AllProducts from "@/components/home/AllProducts";
import PriceMover from "@/components/home/PriceMover";
import Hero from "@/components/layout/Hero";
import  getProducts  from "@/lib/products";
import { Suspense } from "react";


const ProductSections = async()=>{

    const products = await getProducts()
     return (
        <>
            <PriceMover products = {products}/>
            <AllProducts products = {products}/>
        </>
    );

}
export default async function Home() {
 return (
    <main>
        <Hero/>
        <Suspense fallback = {
            <div className="flex min-h-40 items-center justify-center">
                <p>পণ্য লোড হচ্ছে...</p>
            </div>
        }>
            <ProductSections/>
        </Suspense>
    </main>
 )
   
}