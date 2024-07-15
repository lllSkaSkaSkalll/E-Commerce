import { useEffect, useState } from "react";
import { Banner, Categories, Product } from "./typeData";
import { getDataBanner, getDataCategory, getDataProduct } from "./getData";

export const useFetchData = () => {
    const [product, setProduct] = useState<Product[]>([]);
    const [banner, setBanner] = useState<Banner[]>([]);
    const [category, setCategory] = useState<Categories[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const [product, banner, category] = await Promise.all([getDataProduct(), getDataBanner(), getDataCategory()]);

            setBanner(banner);
            setCategory(category);
            setProduct(product);
        };

        fetchData();
    }, []);

    return { product, banner, category };
};
