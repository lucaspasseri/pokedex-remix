-- CreateTable
CREATE TABLE "Type" (
    "name" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "PokemonType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "typeName" TEXT NOT NULL,
    "pokemonNumber" INTEGER NOT NULL,
    CONSTRAINT "PokemonType_typeName_fkey" FOREIGN KEY ("typeName") REFERENCES "Type" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PokemonType_pokemonNumber_fkey" FOREIGN KEY ("pokemonNumber") REFERENCES "Pokemon" ("number") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pokemon" (
    "number" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "predecessorNumber" INTEGER,
    CONSTRAINT "Pokemon_predecessorNumber_fkey" FOREIGN KEY ("predecessorNumber") REFERENCES "Pokemon" ("number") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_number_key" ON "Pokemon"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_name_key" ON "Pokemon"("name");
