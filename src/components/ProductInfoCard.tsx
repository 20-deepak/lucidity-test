import Image, { StaticImageData } from "next/image";
import React from "react";

interface ProductItem {
  name: string;
  value: number;
  icon: StaticImageData;
}

function ProductInfoCard({ item }: { item: ProductItem }) {
  return (
    <div className="p-4 bg-[#243325] flex gap-3 rounded-md">
      <Image
        className="h-8 w-8"
        alt="icon"
        src={item.icon.src}
        height={24}
        width={24}
      />
      <div className="flex flex-col gap-2">
        <span>{item.name}</span>
        <span className="text-4xl">{item.value}</span>
      </div>
    </div>
  );
}

export default ProductInfoCard;
