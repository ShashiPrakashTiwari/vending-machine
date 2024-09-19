let total = 0;

function selectItem(item, price) {
    // Add selected item to the list
    const selectedItemsList = document.getElementById('selectedItems');
    const listItem = document.createElement('li');
    listItem.textContent = `${item} - ₹${price}`;
    selectedItemsList.appendChild(listItem);

    // Update the total price
    total =total + price;
    document.getElementById('totalPrice').textContent = total.toFixed(2);
}

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Gather user details
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Add content to PDF
    doc.text('Vending Machine Receipt', 10, 10);
    doc.text(`Name: ${name}`, 10, 20);
    doc.text(`Email: ${email}`, 10, 30);
    doc.text(`Phone: ${phone}`, 10, 40);
    doc.text('Selected Items:', 10, 50);

    const items = document.getElementById('selectedItems').getElementsByTagName('li');
    let y = 60;
    for (let i = 0; i < items.length; i++) {
        doc.text(items[i].textContent, 10, y);
        y += 10;
    }

    doc.text(`Total: ₹${total.toFixed(2)}`, 10, y + 10);

    // Save the PDF
    doc.save('receipt.pdf');
}
