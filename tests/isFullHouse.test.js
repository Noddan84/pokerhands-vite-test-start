import { describe, it, expect } from 'vitest';
import Hand from '../Hand.js';
import CompareHands from './CompareHands';

describe('TEST - Full House', () => {
  it('should return points for a full house', () => {
    const hand = new Hand('♠A', '♦A', '♣A', '♥K', '♠K');
    expect(CompareHands.isFullHouse(hand)).toBe(CompareHands.rankToPoint('A'));
  });

  it('should return 0 if there is no full house', () => {
    const hand = new Hand('♠A', '♦K', '♣Q', '♥J', '♠10');
    expect(CompareHands.isFullHouse(hand)).toBe(0);
  });

  it('should return a higher score for a stronger full house', () => {
    const hand1 = new Hand('♠A', '♦A', '♣A', '♥K', '♠K'); // Full House: Aces over Kings
    const hand2 = new Hand('♠K', '♦K', '♣K', '♥Q', '♠Q'); // Full House: Kings over Queens

    const hand1Score = CompareHands.isFullHouse(hand1);
    const hand2Score = CompareHands.isFullHouse(hand2);

    expect(hand1Score).toBeGreaterThan(hand2Score);
  });
});
