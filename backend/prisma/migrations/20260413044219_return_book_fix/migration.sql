-- AlterTable
ALTER TABLE `books` MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE `issues` MODIFY `issue_status` VARCHAR(191) NOT NULL DEFAULT 'ISSUED',
    MODIFY `penalty` INTEGER NULL;

-- CreateIndex
CREATE INDEX `issues_issue_status_idx` ON `issues`(`issue_status`);

-- CreateIndex
CREATE INDEX `issues_is_deleted_idx` ON `issues`(`is_deleted`);

-- RenameIndex
ALTER TABLE `issues` RENAME INDEX `issues_book_id_fkey` TO `issues_book_id_idx`;

-- RenameIndex
ALTER TABLE `issues` RENAME INDEX `issues_user_id_fkey` TO `issues_user_id_idx`;
