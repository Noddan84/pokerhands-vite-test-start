import { describe, it, expect } from 'vitest';
import Hand from '../Hand.js';
import CompareHands from './CompareHands';

describe('TEST - One Pair', () => {
  it('should return a score for one pair', () => {
    let hand = new Hand('♥A', '♦A', '♣K', '♠Q', '♥T');
    expect(CompareHands.isOnePair(hand)).toBe(14); // A = 14
  });

  it('should return 0 for no one pair', () => {
    let hand = new Hand('♥A', '♦K', '♣Q', '♠J', '♥T');
    expect(CompareHands.isOnePair(hand)).toBe(0);
  });

  it('should return a higher score for a stronger one pair', () => {
    let hand1 = new Hand('♦7', '♣6', '♣4', '♣8', '♣7'); // Pair of 7s
    let hand2 = new Hand('♣A', '♦9', '♦5', '♦Q', '♦A'); // Pair of Aces
    let hand1Score = CompareHands.isOnePair(hand1);
    let hand2Score = CompareHands.isOnePair(hand2);
    expect(hand2Score).toBeGreaterThan(hand1Score);
  });
});
