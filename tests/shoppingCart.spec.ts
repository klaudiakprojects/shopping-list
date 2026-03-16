import { test, expect } from '@playwright/test';
import { ShoppingPage } from '../pages/ShoppingPage';

test.describe('Shopping List Basic Flow', () => {

    test('Should add an item to a specific category', async ({ page }) => {
        const shoppingPage = new ShoppingPage(page);

        const item = 'Carrots';
        const category = 'Grocery';

        await shoppingPage.goto();
        await shoppingPage.inputItemName.fill(item);
        await shoppingPage.categorySelect.selectOption(category);
        await shoppingPage.addItemButton.click();

        await expect(shoppingPage.shoppingCartFolderName).toBeVisible();
        await expect(shoppingPage.shoppingCartFolderName).toContainText(category);

        const categoryList = shoppingPage.getCategoryList(category);
        await expect(categoryList).toContainText(item);
    });

    test('Should mark as done specific item', async ({ page }) => {
        const shoppingPage = new ShoppingPage(page);

        const item = 'Carrots';
        const category = 'Grocery';

        await shoppingPage.goto();
        await shoppingPage.inputItemName.fill(item);
        await shoppingPage.categorySelect.selectOption(category);
        await shoppingPage.addItemButton.click();
        await shoppingPage.doneButton.click();
        expect(shoppingPage.itemsInFolder.locator('span')).toHaveCSS('text-decoration', 'line-through');
    });

});