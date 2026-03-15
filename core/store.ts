import { ShoppingItem } from './types';

export class ShoppingList {
    private items: ShoppingItem[] = [];

    addItem(name: string, category: string): void {
        this.items.push({
            id: crypto.randomUUID(),
            name,
            completed: false,
            category
        });
    }

    toggleItem(id: string): void {
        const item = this.items.find(i => i.id === id);
        if (item) item.completed = !item.completed;
    }

    removeItem(id: string): void {
        this.items = this.items.filter(i => i.id !== id);
    }

    removeCategory(category: string): void {
        this.items = this.items.filter(i => i.category !== category);
    }

    getCategories(): string[] {
        return [...new Set(this.items.map(i => i.category))];
    }

    getItemsByCategory(category: string): ShoppingItem[] {
        return this.items.filter(i => i.category === category);
    }
}