export default class CompareHands {

  static suits = '♥♦♣♠';
  static suitRank = {
    '♠': 4,
    '♥': 3,
    '♦': 2,
    '♣': 1
  };
  static ranks = '23456789TJQKA';

  // return the winning hand
  static comparer(hand1, hand2) {
    let comparers = [
      'isRoyalStraightFlush',
      // ... andra jämförare ...
    ];

    for (let comparer of comparers) {
      let hand1Score = this[comparer](hand1);
      let hand2Score = this[comparer](hand2);
      console.log(comparer, 'hand1Score', hand1Score, 'hand2Score', hand2Score);

      // Om båda händerna inte har denna typ av kombination
      if (hand1Score === 0 && hand2Score === 0) continue;

      // Jämför poäng
      if (hand1Score > hand2Score) return hand1;
      if (hand2Score > hand1Score) return hand2;

      // Om poängen är lika, jämför färg
      if (hand1Score === hand2Score) {
        const hand1Suit = hand1.cards[0].suit; // Anta att alla kort i royal flush har samma färg
        const hand2Suit = hand2.cards[0].suit;
        if (this.suitRank[hand1Suit] > this.suitRank[hand2Suit]) return hand1;
        if (this.suitRank[hand1Suit] < this.suitRank[hand2Suit]) return hand2;
      }
    }

    return null; // Ingen hand vinner
  }

  static isStraightFlush(hand) {
    const flushScore = this.isFlush(hand); // Kontrollera om handen är en flush
    if (flushScore === 0) return 0; // Inte en flush, därmed inte en straight flush

    // Sortera korten för att kontrollera om de bildar en straight
    this.sortByRank(hand);

    // Hämta unika ranker
    const ranks = hand.cards.map(card => card.rank);
    const uniqueRanks = [...new Set(ranks)];

    // Om vi inte har exakt 5 unika kort, kan vi inte ha en straight
    if (uniqueRanks.length !== 5) return 0;

    // Konvertera till poäng och sortera
    const points = uniqueRanks.map(rank => this.rankToPoint(rank)).sort((a, b) => a - b);

    // Kontrollera om korten är i följd
    for (let i = 0; i < points.length - 1; i++) {
      if (points[i] + 1 !== points[i + 1]) {
        return 0; // Inte en straight
      }
    }

    // Om handen är en straight flush, returnera poängen för det högsta kortet
    return this.rankToPoint(uniqueRanks[uniqueRanks.length - 1]);
  }


  static isRoyalStraightFlush(hand) {
    const royalRanks = ['A', 'K', 'Q', 'J', 'T'];

    const checkHand = (hand) => {
      if (!hand || !hand.cards) return 0; // Kontrollera att handen är definierad och har kort
      const counts = {};
      for (let card of hand.cards) {
        if (!royalRanks.includes(card.rank)) return 0; // Inte en royal flush
        counts[card.suit] = (counts[card.suit] || 0) + 1;
      }
      for (let suit in counts) {
        if (counts[suit] === 5) return this.rankToPoint('A'); // Högsta poäng för royal flush
      }
      return 0; // Ingen royal flush
    };

    return checkHand(hand); // Returnera poängen för handen
  }



  static isFourOfAKind(hand) { 
    const counts = {};

    // Count occurrences of each rank
    hand.cards.forEach(card => {
      counts[card.rank] = (counts[card.rank] || 0) + 1;
    });

    // Find the rank with exactly four cards
    for (let rank in counts) {
      if (counts[rank] === 4) {
        return this.rankToPoint(rank); // Return score based on the rank of the three of a kind
      }
    }
    return 0; // Return 0 if there is no four of a kind   
  }

  static isFullHouse(hand) {
    const counts = {};
    hand.cards.forEach(card => {
      counts[card.rank] = (counts[card.rank] || 0) + 1;
    });

    let hasThree = false;
    let hasPair = false;

    for (let rank in counts) {
      if (counts[rank] === 3) hasThree = true;
      if (counts[rank] === 2) hasPair = true;
    }

    return hasThree && hasPair ? this.rankToPoint(Object.keys(counts).find(rank => counts[rank] === 3)) : 0;
  }

  static isFlush(hand) {
    let suits = [];
    for (let card of hand.cards) {
      suits.push(card.suit);
    }
    // not a flush -> 0
    if ([...new Set(suits)].length !== 1) {
      return 0;
    }
    // return points depending of strength of flush
    this.sortByRank(hand);
    let score = 0, counter = 0;
    for (let card of hand.cards) {
      score += this.rankToPoint(card.rank) * 10 ** counter;
      counter += 2;
    }
    return score;
  }

  static isStraight(hand) {
    // Sortera korten
    this.sortByRank(hand);

    // Hämta unika ranker
    const ranks = hand.cards.map(card => card.rank);
    const uniqueRanks = [...new Set(ranks)];

    // Om vi inte har exakt 5 unika kort, kan vi inte ha en straight
    if (uniqueRanks.length !== 5) return 0;

    // Konvertera till poäng och sortera
    const points = uniqueRanks.map(rank => this.rankToPoint(rank)).sort((a, b) => a - b);

    // Kontrollera om korten är i följd
    for (let i = 0; i < points.length - 1; i++) {
      if (points[i] + 1 !== points[i + 1]) {
        return 0; // Inte en straight
      }
    }

    // Hantera specialfall för A-2-3-4-5
    if (uniqueRanks.includes('A') && uniqueRanks.includes('2') &&
      uniqueRanks.includes('3') && uniqueRanks.includes('4') &&
      uniqueRanks.includes('5')) {
      return this.rankToPoint('5'); // Returnera poängen för 5
    }

    // Hantera A-K-Q-J-10
    if (uniqueRanks.includes('A') && uniqueRanks.includes('K') &&
      uniqueRanks.includes('Q') && uniqueRanks.includes('J') &&
      uniqueRanks.includes('T')) {
      return this.rankToPoint('A'); // Returnera poängen för esset (det högsta kortet)
    }

    // Returnera poängen för det högsta kortet
    return this.rankToPoint(uniqueRanks[uniqueRanks.length - 1]);
  }

  static isThreeOfAKind(hand) {
    const counts = {};

    // Count occurrences of each rank
    hand.cards.forEach(card => {
      counts[card.rank] = (counts[card.rank] || 0) + 1;
    });

    // Find the rank with exactly three cards
    for (let rank in counts) {
      if (counts[rank] === 3) {
        return this.rankToPoint(rank); // Return score based on the rank of the three of a kind
      }
    }
    return 0; // Return 0 if there is no three of a kind
  }

  static isTwoPair(hand) {
    const counts = {};
    hand.cards.forEach(card => {
      counts[card.rank] = (counts[card.rank] || 0) + 1;
    });

    let pairs = 0;
    let highestPairRank = 0;
    let secondPairRank = 0;

    for (let rank in counts) {
      if (counts[rank] === 2) {
        pairs++;
        if (highestPairRank === 0) {
          highestPairRank = this.rankToPoint(rank);
        } else {
          secondPairRank = this.rankToPoint(rank);
        }
      }
    }
    // Return the combined score of both pairs
    return pairs === 2 ? highestPairRank + secondPairRank : 0;
  }

  static isOnePair(hand) {
    const counts = {};
    hand.cards.forEach(card => {
      counts[card.rank] = (counts[card.rank] || 0) + 1;
    });

    for (let rank in counts) {
      if (counts[rank] === 2) {
        return this.rankToPoint(rank);
      }
    }
    return 0;
  }

  static isHighestCard(hand) {
    this.sortByRank(hand);
    return this.rankToPoint(hand.cards[hand.cards.length - 1].rank);
  }

  // helper functions below:
  static rankToPoint(rank, isLowAce = false) {
    if (isLowAce && rank === 'A') return 1; // Ess som lägsta kort
    if (rank === 'A') return 14; // Högsta värde
    if (rank === '2') return 2; // Lägsta värde i andra sammanhang
    return this.ranks.indexOf(rank) + 2; 
  }

  static sortByRank(hand) {
    hand.cards.sort((a, b) => {
      const rankA = this.rankToPoint(a.rank);
      const rankB = this.rankToPoint(b.rank);
      return rankA - rankB; // Returnerar skillnaden för korrekt sortering
      //första sorteringen något buggig om två kort har samma rank
    });
  }
}