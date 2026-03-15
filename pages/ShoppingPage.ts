import { Page, Locator, expect } from '@playwright/test';

export class ShoppingPage {
    readonly page: Page;
    readonly inputItemName: Locator;
    readonly categorySelect: Locator;
    readonly addItemButton: Locator;
    readonly shoppingCartFolderName: Locator;
    readonly deleteFolderButton: Locator;
    readonly itemsInFolder: Locator;
    readonly doneButton: Locator;
    readonly deleteItemButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.inputItemName = page.locator('#input-item-name');
        this.categorySelect = page.locator('#category-select');
        this.addItemButton = page.locator('#add-btn');
        this.shoppingCartFolderName = page.locator('.folder-header h3');
        this.deleteFolderButton = page.locator('.btn-folder-delete');
        this.itemsInFolder = page.locator('#list-container li');
        this.doneButton = page.locator('.btn-done');
        this.deleteItemButton = page.locator('btn-delete');
    }

    async goto() {
        await this.page.goto('/');
    }

    getCategoryList(categoryName: string): Locator {
        return this.page.locator(`#list-${categoryName}`);
    }
}