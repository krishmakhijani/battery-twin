-- CreateTable
CREATE TABLE "Battery" (
    "id" SERIAL NOT NULL,
    "voltage_measured" DOUBLE PRECISION NOT NULL,
    "current_measured" DOUBLE PRECISION NOT NULL,
    "temperature_measured" DOUBLE PRECISION NOT NULL,
    "current_load" DOUBLE PRECISION NOT NULL,
    "voltage_load" DOUBLE PRECISION NOT NULL,
    "time" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Battery_pkey" PRIMARY KEY ("id")
);
