-- CreateTable
CREATE TABLE "tax_offices" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "postcode" INTEGER,
    "place" TEXT,
    "po_box" TEXT,
    "postcode_po_box" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_by" INTEGER,
    "updated_by" INTEGER,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    PRIMARY KEY ("id")
);
