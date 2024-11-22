/*
  Warnings:

  - You are about to alter the column `date` on the `HistoricalPrices` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_HistoricalPrices" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "price" INTEGER NOT NULL,
    "instrument_name" TEXT NOT NULL
);
INSERT INTO "new_HistoricalPrices" ("date", "id", "instrument_name", "price") SELECT "date", "id", "instrument_name", "price" FROM "HistoricalPrices";
DROP TABLE "HistoricalPrices";
ALTER TABLE "new_HistoricalPrices" RENAME TO "HistoricalPrices";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
