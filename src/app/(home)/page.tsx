import AllProducts from "@/components/home/AllProducts";
import PriceMover from "@/components/home/PriceMover";
import Hero from "@/components/layout/Hero";
import { HomeProductsSkeleton } from "@/components/shared/Skeletons";
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
            <HomeProductsSkeleton />
        }>
            <ProductSections/>
        </Suspense>
    </main>
 )
   
}