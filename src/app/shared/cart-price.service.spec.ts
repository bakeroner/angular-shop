import { TestBed } from '@angular/core/testing';

import { CartPriceService } from './cart-price.service';

describe('CartPriceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartPriceService = TestBed.get(CartPriceService);
    expect(service).toBeTruthy();
  });
});
