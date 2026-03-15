import { ShoppingList } from "../core/store";

const list = new ShoppingList();

window.addEventListener('load', () => {
    const input = document.querySelector('#input-item-name') as HTMLInputElement;
    const categorySelect = document.querySelector('#category-select') as HTMLSelectElement;
    const addButton = document.querySelector('#add-btn') as HTMLButtonElement;
    const listContainer = document.querySelector('#list-container') as HTMLDivElement;

    function render() {
        listContainer.innerHTML = '';
        
        list.getCategories().forEach(category => {
            const folder = document.createElement('div');
            folder.className = 'category-folder';
            
            folder.innerHTML = `
                <div class="folder-header">
                    <h3>📁 ${category}</h3>
                    <button class="btn-folder-delete" data-cat="${category}">Delete Folder</button>
                </div>
                <ul id="list-${category}"></ul>
            `;

            const ul = folder.querySelector('ul')!;
            
            list.getItemsByCategory(category).forEach(item => {
                const li = document.createElement('li');
                if (item.completed) li.classList.add('done');
                
                li.innerHTML = `
                    <span>${item.name}</span>
                    <div class="actions">
                        <button class="btn-done" data-id="${item.id}">✔</button>
                        <button class="btn-delete" data-id="${item.id}">✖</button>
                    </div>
                `;
                ul.appendChild(li);
            });

            listContainer.appendChild(folder);
        });

        attachListeners();
    }

    function attachListeners() {
        document.querySelectorAll('.btn-done').forEach(btn => {
            (btn as HTMLElement).onclick = (e) => {
                const id = (e.currentTarget as HTMLElement).dataset.id!;
                list.toggleItem(id);
                render();
            };
        });

        document.querySelectorAll('.btn-delete').forEach(btn => {
            (btn as HTMLElement).onclick = (e) => {
                const id = (e.currentTarget as HTMLElement).dataset.id!;
                list.removeItem(id);
                render();
            };
        });

        document.querySelectorAll('.btn-folder-delete').forEach(btn => {
            (btn as HTMLElement).onclick = (e) => {
                const cat = (e.currentTarget as HTMLElement).dataset.cat!;
                list.removeCategory(cat);
                render();
            };
        });
    }

    addButton.onclick = () => {
        const name = input.value.trim();
        const category = categorySelect.value;
        if (name) {
            list.addItem(name, category);
            input.value = '';
            render();
        }
    };
});