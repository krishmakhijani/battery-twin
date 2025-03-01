/*

Insert the data.csv file in src/ folder and run seed service

*/


import { PrismaClient } from '@prisma/client';
import { parse } from 'csv-parse/sync';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const prisma = new PrismaClient();
const BATCH_SIZE = 1000;

async function main() {
    try {
        const fileContent = readFileSync(join(__dirname, '..', 'src', 'data.csv'));

        const records = parse(fileContent, {
            columns: true,
            skip_empty_lines: true,
            trim: true,
        });

        let batch = [];
        let processedCount = 0;

        for (const record of records) {
            batch.push({
                voltage_measured: parseFloat(record.Voltage_measured),
                current_measured: parseFloat(record.Current_measured),
                temperature_measured: parseFloat(record.Temperature_measured),
                current_load: parseFloat(record.Current_load),
                voltage_load: parseFloat(record.Voltage_load),
                time: parseFloat(record.Time)
            });

            if (batch.length >= BATCH_SIZE) {
                await prisma.battery.createMany({
                    data: batch,
                    skipDuplicates: true,
                });
                processedCount += batch.length;
                console.log(`Processed ${processedCount} records`);
                batch = [];
            }
        }

        if (batch.length > 0) {
            await prisma.battery.createMany({
                data: batch,
                skipDuplicates: true,
            });
            processedCount += batch.length;
            console.log(`Processed ${processedCount} records`);
        }

        console.log('Seed completed successfully');
    } catch (error) {
        console.error('Error seeding data:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
