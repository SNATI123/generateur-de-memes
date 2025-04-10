const canvas = document.getElementById("memeCanvas");
const ctx = canvas.getContext("2d");
let image = new Image();

// Charger l'image depuis l'input
upload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    image.src = reader.result;
  };
  if (file) reader.readAsDataURL(file);
});

// Dessiner l'image + texte
function generateMeme() {
  const topText = document.getElementById("topText").value;
  const bottomText = document.getElementById("bottomText").value;

  image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    const fontSize = Math.floor(canvas.width / 12); // 🔁 Ajuste la taille ici
    ctx.font = `${fontSize}px Impact`;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = fontSize / 20;
    ctx.textAlign = "center";

    ctx.fillText(topText, canvas.width / 2, fontSize);
    ctx.strokeText(topText, canvas.width / 2, fontSize);

    ctx.fillText(bottomText, canvas.width / 2, canvas.height - fontSize / 2);
    ctx.strokeText(bottomText, canvas.width / 2, canvas.height - fontSize / 2);
  };

  if (image.complete) image.onload();
}

// Télécharger le mème
function downloadMeme() {
  const link = document.createElement("a");
  link.download = "meme.png";
  link.href = canvas.toDataURL();
  link.click();
}
