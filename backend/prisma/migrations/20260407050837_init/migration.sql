-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'MEMBER',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `books` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `book_code` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `author_name` VARCHAR(191) NOT NULL,
    `total_copies` INTEGER NOT NULL,
    `available_copies` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'Active',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `books_book_code_key`(`book_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `issues` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `issue_code` VARCHAR(191) NOT NULL,
    `book_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `issued_to` VARCHAR(191) NOT NULL,
    `issue_date` DATETIME(3) NOT NULL,
    `due_date` DATETIME(3) NOT NULL,
    `return_date` DATETIME(3) NULL,
    `issue_status` VARCHAR(191) NOT NULL DEFAULT 'Issued',
    `delay_days` INTEGER NULL,
    `delay_status` VARCHAR(191) NULL,
    `penalty` DOUBLE NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `issues_issue_code_key`(`issue_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `issues` ADD CONSTRAINT `issues_book_id_fkey` FOREIGN KEY (`book_id`) REFERENCES `books`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `issues` ADD CONSTRAINT `issues_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
