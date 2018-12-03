import {InMemoryDbService} from 'angular-in-memory-web-api';

export class productDb implements InMemoryDbService {
	createDb() {
		let products = [
			{id: 1, name: "Item 1", color: 'light', amount: 3, price: 2},
			{id: 2, name: "Item 2", color: 'light', amount: 3, price: 3},
			{id: 3, name: "Item 3", color: 'dark', amount: 3, price: 2.50},
			{id: 4, name: "Item 4", color: 'dark', amount: 3, price: 1.75}
		];
		let users = [
			{id: 1, login: "user", password: 'user', status: 'user'},
			{id: 2, login: "admin", password: 'admin', status: 'admin'}
		];
		return {products: products, users: users};
	}
}