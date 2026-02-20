import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialDatabase1771551887255 implements MigrationInterface {
    name = 'InitialDatabase1771551887255'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`user_id\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`books\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`num_pages\` int NOT NULL, \`price\` int NOT NULL, \`status\` enum ('NOT_STARTED', 'READING', 'FINISHED') NOT NULL DEFAULT 'NOT_STARTED', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`books_categories\` (\`booksId\` bigint NOT NULL, \`categoriesId\` bigint NOT NULL, INDEX \`IDX_a1ddc2a8f7623603cfdb059673\` (\`booksId\`), INDEX \`IDX_94ed1a076f32876f0a15626dd8\` (\`categoriesId\`), PRIMARY KEY (\`booksId\`, \`categoriesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_2296b7fe012d95646fa41921c8b\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`books_categories\` ADD CONSTRAINT \`FK_a1ddc2a8f7623603cfdb0596732\` FOREIGN KEY (\`booksId\`) REFERENCES \`books\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`books_categories\` ADD CONSTRAINT \`FK_94ed1a076f32876f0a15626dd8c\` FOREIGN KEY (\`categoriesId\`) REFERENCES \`categories\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books_categories\` DROP FOREIGN KEY \`FK_94ed1a076f32876f0a15626dd8c\``);
        await queryRunner.query(`ALTER TABLE \`books_categories\` DROP FOREIGN KEY \`FK_a1ddc2a8f7623603cfdb0596732\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_2296b7fe012d95646fa41921c8b\``);
        await queryRunner.query(`DROP INDEX \`IDX_94ed1a076f32876f0a15626dd8\` ON \`books_categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_a1ddc2a8f7623603cfdb059673\` ON \`books_categories\``);
        await queryRunner.query(`DROP TABLE \`books_categories\``);
        await queryRunner.query(`DROP TABLE \`books\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
