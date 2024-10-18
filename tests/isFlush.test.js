import { expect, describe, it } from 'vitest';
import Hand from '../Hand.js';
import CompareHands from '../CompareHands.js';

const suits = '♥♦♣♠';

describe('TEST - Flush', () => {
  it('should return truthy if hand is a flush', () => {
    for (let suit of suits) {
      let hand = new Hand(suit + '2', suit + '6', suit + '4', suit + '8', suit + '7');
      expect(CompareHands.isFlush(hand)).toBeTruthy();
    }
  });

  it('should return falsy if hand is not a flush', () => {
    let hand = new Hand('♣2', '♣6', '♥4', '♣8', '♣7');
    expect(CompareHands.isFlush(hand)).toBeFalsy();
  });

  it('should return a higher score for a stronger flush', () => {
    let hand1 = new Hand('♣2', '♣6', '♣4', '♣8', '♣7');
    let hand2 = new Hand('♦T', '♦9', '♦5', '♦Q', '♦A');
    let hand1Score = CompareHands.isFlush(hand1);
    let hand2Score = CompareHands.isFlush(hand2);
    expect(hand2Score).toBeGreaterThan(hand1Score);
  });
});
