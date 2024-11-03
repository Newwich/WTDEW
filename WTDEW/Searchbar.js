const locations = [
    "Triam Udon Suksa Patthanakarn, Nonthaburi",
    "Central Plaza, Nonthaburi",
    "Future Park Rangsit, Pathum Thani",
    "Big C, Ratchaphruek",
    "Home Pro, Nonthaburi",
    "โรงเรียนเตรียมอุดมศึกษาพัฒนาการนนทบุรี",
    "Central Plaza Wasgate"
];

function showSuggestions(value) {
    const suggestionsContainer = document.getElementById('suggestions');
    suggestionsContainer.innerHTML = ''; 

    if (value.length === 0) return; 

    const filteredSuggestions = locations.filter(item => 
        item.toLowerCase().includes(value.toLowerCase())
    );

    filteredSuggestions.forEach(item => {
        const suggestionItem = document.createElement('div');
        suggestionItem.classList.add('suggestion');
        suggestionItem.textContent = item;
        suggestionItem.onclick = () => {
            document.getElementById('Search').value = item; 
            suggestionsContainer.innerHTML = ''; 
        };
        suggestionsContainer.appendChild(suggestionItem);
    });
}