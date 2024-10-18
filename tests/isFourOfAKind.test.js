import { expect, describe, it } from 'vitest';
import Hand from '../Hand.js';
import CompareHands from '../CompareHands.js';

describe('TEST - Four of a kind', () => {
  it('should return truthy if hand contains four of a kind', () => {
    let hand = new Hand('♥7', '♦7', '♣7', '♠3', '♠7');
    expect(CompareHands.isFourOfAKind(hand)).toBeTruthy();
  });

  it('should return falsy if hand does not contain four of a kind', () => {
    let hand = new Hand('♥7', '♦7', '♣6', '♠3', '♠7');
    expect(CompareHands.isFourOfAKind(hand)).toBeFalsy();
  });

  it('should return a higher score for a stronger four of a kind', () => {
    let hand1 = new Hand('♥7', '♦7', '♣7', '♠3', '♠7');
    let hand2 = new Hand('♥8', '♦8', '♣8', '♠4', '♠8');
    let hand1Score = CompareHands.isFourOfAKind(hand1);
    let hand2Score = CompareHands.isFourOfAKind(hand2);
    expect(hand2Score).toBeGreaterThan(hand1Score);
  });
});
