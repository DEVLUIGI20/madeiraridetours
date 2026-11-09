import { describe, it, expect } from 'vitest';
import {
  DESTINATIONS,
  POPULAR_DESTINATIONS,
  ADVENTURE_ROUTES,
  STANDARD_PRICE,
  EXECUTIVE_PRICE
} from './transfersCatalog';
import { makeWhatsAppUrl } from './index';

describe('Transfers Catalog & Pricing Rules', () => {
  it('should have standard and executive prices defined with positive values', () => {
    expect(STANDARD_PRICE).toBeGreaterThan(0);
    expect(EXECUTIVE_PRICE).toBeGreaterThan(STANDARD_PRICE);
  });

  it('should list essential Madeira destinations', () => {
    expect(DESTINATIONS).toContain('Funchal');
    expect(DESTINATIONS).toContain('Caniço');
    expect(DESTINATIONS).toContain('Porto Moniz');
    expect(DESTINATIONS.length).toBeGreaterThan(10);
  });

  it('popular destinations should all exist in the main destinations list', () => {
    POPULAR_DESTINATIONS.forEach((pop) => {
      expect(DESTINATIONS).toContain(pop);
    });
  });

  it('adventure routes should include required properties and valid pricing', () => {
    expect(ADVENTURE_ROUTES.length).toBeGreaterThan(0);
    ADVENTURE_ROUTES.forEach((route) => {
      expect(route).toHaveProperty('id');
      expect(route).toHaveProperty('title');
      expect(route).toHaveProperty('price');
      expect(route.price).toBeGreaterThan(0);
    });
  });
});

describe('WhatsApp Integration Helpers', () => {
  it('should generate a valid wa.me link with encoded text', () => {
    const text = 'Olá! Gostaria de reservar um transfer.';
    const url = makeWhatsAppUrl(text);

    expect(url).toContain('https://wa.me/');
    expect(url).toContain(encodeURIComponent(text));
  });

  it('should handle empty or default messages correctly', () => {
    const url = makeWhatsAppUrl();
    expect(url).toContain('https://wa.me/');
  });
});

