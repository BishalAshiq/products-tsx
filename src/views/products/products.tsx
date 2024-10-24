"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Product } from "@/types";
import { ProductList } from "@/views/products/productList/productList";
import { BackToHome } from "@/components/backToHome/backToHome";
import { PaginationControls } from "@/views/products/paginationControls/paginationControls";
import { usePagination } from "@/hooks/usePagination";
import { PRODUCTS_DATA } from "@/data/productsData";
import { ProductModal } from "@/views/products/productModal/productModal";

export const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    handlePageChange,
  } = usePagination({ items: PRODUCTS_DATA, itemsPerPage: 5 });


  const handleOpenModal = useCallback((product: Product) => {
    setSelectedProduct(product);
    window.history.pushState(null, "", `#${product.id}`); 
  }, []);

 
  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
    window.history.pushState(null, "", "/products"); 
  }, []);

 
  useEffect(() => {
    const modalId = window.location.hash.replace("#", ""); 
    if (modalId) {
      const productId = Number(modalId);
      const product = PRODUCTS_DATA.find((p) => p.id === productId);
      if (product) {
        setSelectedProduct(product); 
      }
    }
  }, []); 

 
  useEffect(() => {
    const handlePopState = () => {
      const modalId = window.location.hash.replace("#", ""); 
      if (modalId) {
        const productId = Number(modalId);
        const product = PRODUCTS_DATA.find((p) => p.id === productId);
        if (product) {
          setSelectedProduct(product); 
        } else {
          setSelectedProduct(null); 
        }
      } else {
        setSelectedProduct(null); 
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <div>
      <BackToHome />
      <ProductList products={paginatedProducts} onOpenModal={handleOpenModal} />
      <div className="h-4" />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};
