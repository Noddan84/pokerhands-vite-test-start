import { describe, it, expect } from 'vitest';
import Hand from './Hand';
import CompareHands from './CompareHands';

describe('TEST - Highest card', () => {
  it('should return the score of the highest card in a single hand', () => {
    const hand = new Hand('♥2', '♦3', '♣A', '♠K', '♥T');
    expect(CompareHands.isHighestCard(hand)).toBe(14); // A = 14
  });

  it('should compare two hands and return the highest card', () => {
    const hand1 = new Hand('♣A', '♦3', '♠K', '♥2', '♦T'); // Highest card A = 14
    const hand2 = new Hand('♣K', '♦Q', '♠J', '♥T', '♦9'); // Highest card K = 13

    const hand1Score = CompareHands.isHighestCard(hand1);
    const hand2Score = CompareHands.isHighestCard(hand2);

    expect(hand1Score).toBeGreaterThan(hand2Score); // A > K
  });

  it('should fail when both hands have the same highest card', () => {
    const hand1 = new Hand('♣A', '♦3', '♠K', '♥2', '♦T'); // Highest card A = 14
    const hand2 = new Hand('♦A', '♠4', '♥K', '♣J', '♦9'); // Highest card A = 14

    const hand1Score = CompareHands.isHighestCard(hand1);
    const hand2Score = CompareHands.isHighestCard(hand2);
    
    expect(hand1Score).toBe(hand2Score); // Both has value of "14" as highest card
    //Change to toBeGreaterThan om du vill att testet ska fallera
  });
});
