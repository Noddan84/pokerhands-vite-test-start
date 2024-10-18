import { describe, it, expect } from 'vitest';
import Hand from '../Hand.js';
import CompareHands from '../CompareHands.js';

describe('TEST - Straight Flush', () => {
  it('should identify a straight flush', () => {
    const hand = new Hand('♠A', '♠K', '♠Q', '♠J', '♠T'); // Royal Straight Flush (är en straight flush)
    expect(CompareHands.isStraightFlush(hand)).toBeGreaterThan(0);
  });

  it('should not identify a non-straight flush', () => {
    const hand = new Hand('♠A', '♠2', '♠3', '♠4', '♦5'); // Not a straight flush
    expect(CompareHands.isStraightFlush(hand)).toBe(0);
  });

  it('should compare two straight flushes', () => {
    const hand1 = new Hand('♥9', '♥T', '♥J', '♥Q', '♥K'); // Straight Flush: 9-10-J-Q-K
    const hand2 = new Hand('♠8', '♠9', '♠T', '♠J', '♠Q'); // Straight Flush: 8-9-10-J-Q

    const hand1Score = CompareHands.isStraightFlush(hand1);
    const hand2Score = CompareHands.isStraightFlush(hand2);

    expect(hand1Score).toBeGreaterThan(hand2Score); // hand1 should win
  });

  it('should compare two straight flushes of different suits', () => {
    const hand1 = new Hand('♠7', '♠8', '♠9', '♠T', '♠J'); // Straight Flush i Spader
    const hand2 = new Hand('♥6', '♥7', '♥8', '♥9', '♥T'); // Straight Flush i Hjärter

    const hand1Score = CompareHands.isStraightFlush(hand1);
    const hand2Score = CompareHands.isStraightFlush(hand2);

    expect(hand1Score).toBeGreaterThan(hand2Score); // hand1 (Spader) should win
  });

  it('should compare two straight flushes of the same rank', () => {
    const hand1 = new Hand('♣5', '♣6', '♣7', '♣8', '♣9'); // Straight Flush i Klöver
    const hand2 = new Hand('♣3', '♣4', '♣5', '♣6', '♣7'); // Straight Flush i Klöver

    const hand1Score = CompareHands.isStraightFlush(hand1);
    const hand2Score = CompareHands.isStraightFlush(hand2);

    expect(hand1Score).toBeGreaterThan(hand2Score); // Båda händerna är lika
  });
});
