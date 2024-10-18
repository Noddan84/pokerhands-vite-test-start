import { expect, describe, it } from 'vitest';
import Hand from '../Hand.js';
import CompareHands from '../CompareHands.js';

describe('TEST - Two Pair', () => {
  it('should return points for two pairs', () => {
    const hand = new Hand('♠A', '♦A', '♣K', '♥K', '♠2');
    expect(CompareHands.isTwoPair(hand)).toBe(
      CompareHands.rankToPoint('K') + CompareHands.rankToPoint('A') // Should be 14 + 12 = 26
    );
  });

  it('should return 0 if there is no two pairs', () => {
    const hand = new Hand('♠A', '♦K', '♣Q', '♥J', '♠10');
    expect(CompareHands.isTwoPair(hand)).toBe(0);
  });

  it('should return a higher score for a stronger two pair', () => {
    const hand1 = new Hand('♦7', '♦8', '♣4', '♣8', '♣7'); // Pairs of 7s and 8s
    const hand2 = new Hand('♣A', '♣K', '♦5', '♦K', '♦A'); // Pairs of Aces and Kings
    const hand1Score = CompareHands.isTwoPair(hand1);
    const hand2Score = CompareHands.isTwoPair(hand2);
    expect(hand2Score).toBeGreaterThan(hand1Score);
  });
});
