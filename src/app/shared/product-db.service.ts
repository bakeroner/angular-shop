import {InMemoryDbService} from 'angular-in-memory-web-api';

export class productDb implements InMemoryDbService {
	createDb() {
		let products = [
			{id: 1, value: "Item 1", color: 'light'},
			{id: 2, value: "Item 2", color: 'light'},
			{id: 3, value: "Item 3", color: 'dark'},
			{id: 4, value: "Item 4", color: 'dark'}
		];
		return {products};
	}
}