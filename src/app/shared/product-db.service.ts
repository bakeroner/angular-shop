import {InMemoryDbService} from 'angular-in-memory-web-api';

export class productDb implements InMemoryDbService {
	createDb() {
		let products = [
			{id: 1, name: "Item 1", color: 'light', amount: 3},
			{id: 2, name: "Item 2", color: 'light', amount: 3},
			{id: 3, name: "Item 3", color: 'dark', amount: 3},
			{id: 4, name: "Item 4", color: 'dark', amount: 3}
		];
		return {products};
	}
}