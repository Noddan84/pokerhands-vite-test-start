import { describe, it, expect } from 'vitest';
import Hand from '../Hand.js';
import CompareHands from '../CompareHands.js';

describe('TEST - Straight', () => {
  it('should return a score for a straight', () => {
    const hand = new Hand('♥9', '♦8', '♣7', '♥5', '♦6');
    expect(CompareHands.isStraight(hand)).toBeGreaterThan(0);
  });

  it('should return 0 if there is no straight', () => {
    const hand = new Hand('♥9', '♦8', '♣7', '♥2', '♦6');
    expect(CompareHands.isStraight(hand)).toBe(0);
  });

  it('should compare two hands and return the stronger straight (higher Ace)', () => {
    const hand1 = new Hand('♠A', '♦K', '♣Q', '♥J', '♠T'); // Straight: A-K-Q-J-10
    const hand2 = new Hand('♥9', '♦8', '♣7', '♥5', '♦6'); // Straight: 9-8-7-6-5

    const hand1Score = CompareHands.isStraight(hand1);
    const hand2Score = CompareHands.isStraight(hand2);    

    expect(hand1Score).toBeGreaterThan(hand2Score); // A-K-Q-J-10 > 9-8-7-6-5
  });

  it('should compare two hands and return the stronger straight (lower Ace)', () => {
    const hand1 = new Hand('♠A', '♦2', '♣3', '♥4', '♠5'); // Straight: A-K-Q-J-10
    const hand2 = new Hand('♥9', '♦8', '♣7', '♥5', '♦6'); // Straight: 9-8-7-6-5

    const hand1Score = CompareHands.isStraight(hand1);
    const hand2Score = CompareHands.isStraight(hand2);

    expect(hand2Score).toBeGreaterThan(hand1Score); // A-2-3-4-5 < 9-8-7-6-5
  });
});

