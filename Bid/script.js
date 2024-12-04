let players = {
    "Player 1": 100,
    "Player 2": 100,
    "Player 3": 100,
    "Player 4": 100,
};

let currentItem = "";
let bids = {};
let highestBid = 0;
let highestBidder = "";

const items = ["Golden Sword", "Mystic Amulet", "Ancient Book", "Dragon Egg"];

function startAuction() {
    // Pick a random item for auction
    currentItem = items[Math.floor(Math.random() * items.length)];
    document.getElementById("item-name").textContent = "Item: " + currentItem;
    document.getElementById("status").textContent = "Place your bids!";
    document.getElementById("next-item").style.display = "none";
    document.getElementById("winner-section").style.display = "none";
    bids = {};
}

function placeBid(player, bid) {
    if (bid <= 0 || bid > players[player]) {
        alert(`${player} cannot bid with ${bid} coins. Please place a valid bid.`);
        return;
    }
    bids[player] = bid;
    players[player] -= bid;
    document.getElementById(player.toLowerCase().replace(" ", "")).textContent = `${player}: ${players[player]} coins`;
}

function endAuction() {
    // Find the highest bid
    for (const player in bids) {
        if (bids[player] > highestBid) {
            highestBid = bids[player];
            highestBidder = player;
        }
    }

    document.getElementById("status").textContent = `${highestBidder} wins the ${currentItem} with a bid of ${highestBid} coins!`;
    document.getElementById("winner-name").textContent = "Winner: " + highestBidder;
    document.getElementById("winner-bid").textContent = "Bid: " + highestBid;
    document.getElementById("winner-section").style.display = "block";
    document.getElementById("next-item").style.display = "inline-block";
}

document.getElementById("place-bid").addEventListener("click", function () {
    const bidAmount = parseInt(document.getElementById("bid-amount").value);
    const currentPlayer = "Player 1"; // Example: Place bid for Player 1

    placeBid(currentPlayer, bidAmount);
    document.getElementById("bid-amount").value = "";
});

document.getElementById("next-item").addEventListener("click", function () {
    startAuction();
    updatePlayerStatus();
});

function updatePlayerStatus() {
    for (const player in players) {
        document.getElementById(player.toLowerCase().replace(" ", "")).textContent = `${player}: ${players[player]} coins`;
    }
}

startAuction();
