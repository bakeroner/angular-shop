import {InMemoryDbService} from 'angular-in-memory-web-api';

export class productDb implements InMemoryDbService {
	createDb() {
		let products = [
			{id: 1, name: "Item 1", type: 'Light', amount: 3, price: 2},
			{id: 2, name: "Item 2", type: 'Ale', amount: 3, price: 3},
			{id: 3, name: "Item 3", type: 'Dark', amount: 3, price: 2.50},
			{id: 4, name: "Item 4", type: 'Ale', amount: 3, price: 1.75},
			{id: 5, name: "Item 1", type: 'Dark', amount: 3, price: 2}
		];
		let users = [
			{id: 1, login: "user", password: 'user', status: 'user'},
			{id: 2, login: "admin", password: 'admin', status: 'admin'}
		];
		let shoppingList = [
			{userId: 1, productList: [{id: 5, name: "Item 1", type: 'Dark', amount: 3, price: 2}]},
			{userId: 2, productList: []}
		];
		return {products: products, users: users, shoppingList: shoppingList};
	}
}