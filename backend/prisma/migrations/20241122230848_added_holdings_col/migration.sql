-- CreateTable
CREATE TABLE "Holdings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tradingsymbol" TEXT NOT NULL,
    "exchange" TEXT NOT NULL,
    "isin" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "authorised_date" DATETIME NOT NULL,
    "average_price" REAL NOT NULL,
    "last_price" REAL NOT NULL,
    "close_price" REAL NOT NULL,
    "pnl" REAL NOT NULL,
    "day_change" REAL NOT NULL,
    "day_change_percentage" REAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "Holdings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
