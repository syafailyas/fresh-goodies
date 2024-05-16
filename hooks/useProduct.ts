// useProduct.js
"use client";

import { useState, useEffect, useCallback } from "react";
import { config } from "@/constants/url";
import { Product } from "@/types/product";

interface ProductGroup
{
  [key: string]: Product[];
}

const useProduct = () =>
{
  const [allProduct, setAllProduct] = useState< Product[] >( [] );
  const [products, setProducts] = useState< Product[] >( [] );
  const [categories, setCategories] = useState< string[] >( [] );
  const [productGroup, setProductGroup] = useState<ProductGroup>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const getAPI = `${config.BASE_URL}${config.endpoints.products}`;

  const fetchData = () =>
  {
    fetch(getAPI)
    .then( (res) => res.json() )
    .then(
      (data) =>
      {
        setAllProduct(data);
      }
    )
    .catch(
      (err) =>
      {
        console.log(err);
      }
    );
  };

  useEffect(
    () =>
    {
      fetchData();
    }, []
  );

  // Sort products by name in ascending order
  const sortProductsAscending = () =>
  {
    const sortedProducts = [...allProduct].sort(
      (a, b) =>
      {
        return a.name.localeCompare(b.name);
      }
    );

    setAllProduct(sortedProducts);
  };

  // Sort products by name in descending order
  const sortProductsDescending = () =>
  {
    const sortedProducts = [...allProduct].sort(
      (a, b) =>
      {
        return b.name.localeCompare(a.name);
      }
    );

    setAllProduct(sortedProducts);
  };

  const filterProductsByCategory = useCallback(
    () =>
    {
      if (selectedCategory && productGroup)
      {
        return productGroup[selectedCategory];
      }

      return products;
    }, [selectedCategory, productGroup, products]
  );

  const selectCategory = (category: string | null) =>
  {
    setSelectedCategory(category);
  };

  return {
    allProduct,
    sortProductsAscending,
    sortProductsDescending,
    products,
    productGroup,
    categories,
    selectedCategory,
    selectCategory,
    filteredProducts: filterProductsByCategory(),
  };
};

export default useProduct;