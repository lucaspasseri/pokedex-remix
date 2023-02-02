-- CreateTable
CREATE TABLE "Matchup" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "typeAName" TEXT NOT NULL,
    "typeBName" TEXT NOT NULL,
    "effectiveness" REAL NOT NULL,
    CONSTRAINT "Matchup_typeAName_fkey" FOREIGN KEY ("typeAName") REFERENCES "Type" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Matchup_typeBName_fkey" FOREIGN KEY ("typeBName") REFERENCES "Type" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);
