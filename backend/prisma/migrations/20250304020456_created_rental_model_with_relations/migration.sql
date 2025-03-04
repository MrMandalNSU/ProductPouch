-- CreateTable
CREATE TABLE "Rental" (
    "id" SERIAL NOT NULL,
    "rent_from" TEXT NOT NULL,
    "rent_to" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,
    "renter_id" INTEGER NOT NULL,

    CONSTRAINT "Rental_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rental" ADD CONSTRAINT "Rental_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rental" ADD CONSTRAINT "Rental_renter_id_fkey" FOREIGN KEY ("renter_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
