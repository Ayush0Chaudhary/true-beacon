-- CreateTable
CREATE TABLE "HistoricalPrices" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "instrument_name" TEXT NOT NULL
);
