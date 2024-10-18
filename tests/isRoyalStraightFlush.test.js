import { describe, it, expect } from 'vitest';
import Hand from '../Hand.js';
import CompareHands from '../CompareHands.js';

describe('TEST - Royal Straight Flush', () => {
  it('should identify a royal straight flush', () => {
    const hand = new Hand('♣A', '♣K', '♣Q', '♣J', '♣T'); // Royal Straight Flush
    expect(CompareHands.isRoyalStraightFlush(hand)).toBeTruthy();
  });

  it('should not identify a non-royal straight flush', () => {
    const hand = new Hand('♠A', '♠2', '♠3', '♠4', '♦5'); // Not a royal straight flush
    expect(CompareHands.isRoyalStraightFlush(hand)).toBeFalsy();
  });

  it('should compare two royal straight flushes of different suits', () => {
    const hand1 = new Hand('♠A', '♠K', '♠Q', '♠J', '♠T'); // Royal Straight Flush i Spader
    const hand2 = new Hand('♥A', '♥K', '♥Q', '♥J', '♥T'); // Royal Straight Flush i Hjärter

    const hand1Score = CompareHands.isRoyalStraightFlush(hand1);
    const hand2Score = CompareHands.isRoyalStraightFlush(hand2);

    // Förväntar oss att båda har samma poäng
    expect(hand1Score).toBe(hand2Score);

    const result = CompareHands.comparer(hand1, hand2); // Använd comparer för att avgöra vinnaren

    expect(result).toBe(hand1); // hand1 (Spader) should win
  });

});
