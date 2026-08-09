document.addEventListener("DOMContentLoaded", () => {
  const noteEditor = document.getElementById("noteEditor");
  const hiddenContent = document.getElementById("hiddenContent");
  const form = document.querySelector("form");

  const boldBtn = document.getElementById("boldBtn");
  const underlineBtn = document.getElementById("underlineBtn");
  const fontSizeSelector = document.getElementById("fontSizeSelector");
  const colorPicker = document.getElementById("colorPicker");
  const tableBtn = document.getElementById("tableBtn");
  const checklistBtn = document.getElementById("checklistBtn");
  const bulletBtn = document.getElementById("bulletBtn");
  const numberBtn = document.getElementById("numberBtn");
  const imageBtn = document.getElementById("imageBtn");

  if (noteEditor) {
    boldBtn.onclick = () => document.execCommand("bold");
    underlineBtn.onclick = () => document.execCommand("underline");
    fontSizeSelector.onchange = () => document.execCommand("fontSize", false, fontSizeSelector.value);
    colorPicker.oninput = () => noteEditor.style.backgroundColor = colorPicker.value;
    bulletBtn.onclick = () => document.execCommand("insertUnorderedList");
    numberBtn.onclick = () => document.execCommand("insertOrderedList");

    tableBtn.onclick = () => {
      const rows = prompt("Number of rows:");
      const cols = prompt("Number of columns:");
      if (rows && cols) {
        let table = "<table border='1' style='border-collapse:collapse;width:100%;'>";
        for (let r = 0; r < rows; r++) {
          table += "<tr>";
          for (let c = 0; c < cols; c++) {
            table += "<td contenteditable='true' style='padding:5px;'> </td>";
          }
          table += "</tr>";
        }
        table += "</table>";
        document.execCommand("insertHTML", false, table);
      }
    };

    checklistBtn.onclick = () => {
      const checklist = `<ul><li><input type="checkbox" /> </li></ul>`;
      document.execCommand("insertHTML", false, checklist);
    };

    imageBtn.onclick = () => {
      const url = prompt("Enter image URL:");
      if (url) {
        document.execCommand("insertImage", false, url);
      }
    };

    // Form submission: copy editable div into hidden input
    form.onsubmit = () => {
      hiddenContent.value = noteEditor.innerHTML.trim();
    };
  }
});


