export const getDataProduct = () => {
    const data = fetch("/E-Commerce/data/Product.json").then((res) => res.json());

    return data;
};

export const getDataBanner = () => {
    const data = fetch("/E-Commerce/data/Banner.json").then((res) => res.json());

    return data;
};

export const getDataCategory = () => {
    const data = fetch("/E-Commerce/data/Category.json").then((res) => res.json());

    return data;
};
