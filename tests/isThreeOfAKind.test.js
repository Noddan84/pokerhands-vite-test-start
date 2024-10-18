import { describe, it, expect } from 'vitest';
import Hand from '../Hand.js';
import CompareHands from '../CompareHands.js';

describe('TEST - Three of a Kind', () => {
  it('should return points for three of a kind', () => {
    const hand = new Hand('♥7', '♦2', '♣7', '♠3', '♠7');
    expect(CompareHands.isThreeOfAKind(hand)).toBeGreaterThan(0); // Expecting a positive score for three of a kind
  });

  it('should return 0 if there is no three of a kind', () => {
    const hand = new Hand('♥7', '♦2', '♣6', '♠3', '♠4');
    expect(CompareHands.isThreeOfAKind(hand)).toBe(0);
  });

  it('should return a higher score for a stronger three of a kind', () => {
    const hand1 = new Hand('♦7', '♣7', '♠7', '♥2', '♣3'); // Three of a kind sevens
    const hand2 = new Hand('♣A', '♦A', '♥A', '♠4', '♣5'); // Three of a kind aces
    const hand1Score = CompareHands.isThreeOfAKind(hand1);
    const hand2Score = CompareHands.isThreeOfAKind(hand2);
    expect(hand2Score).toBeGreaterThan(hand1Score);
  });
});
