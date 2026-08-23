const STORAGE_KEY = "oil-salon-artworks-v6";
const LEGACY_STORAGE_KEYS = [
  "oil-salon-artworks-v1",
  "oil-salon-artworks-v2",
  "oil-salon-artworks-v3",
  "oil-salon-artworks-v4",
  "oil-salon-artworks-v5",
];
const LEGACY_IMAGE_RESET_KEY = "oil-salon-images-reset-v6";
const IMAGE_DB_NAME = "oil-salon-image-store";
const IMAGE_DB_VERSION = 1;
const IMAGE_STORE_NAME = "uploaded-images";
const VISUAL_SCORE_MIN = 1;
const VISUAL_SCORE_MAX = 10;

const moodLabels = {
  landscape: "Landscape Room",
  "still-life": "Still Life Room",
  city: "City Room",
  figure: "Figure Room",
  abstract: "Abstract Room",
};

const seedArtworks = [];

const galleryGrid = document.querySelector("#gallery-grid");
const cardTemplate = document.querySelector("#art-card-template");
const filterButtons = document.querySelectorAll(".filter-button");
const artworkForm = document.querySelector("#artwork-form");
const artworkFile = document.querySelector("#artwork-file");
const fileDrop = document.querySelector(".file-drop");
const fileName = document.querySelector("#file-name");
const commentStream = document.querySelector("#comment-stream");
const dialog = document.querySelector("#art-dialog");
const closeDialog = document.querySelector(".close-dialog");
const dialogImage = document.querySelector("#dialog-image");
const dialogMood = document.querySelector("#dialog-mood");
const dialogTitle = document.querySelector("#dialog-title");
const dialogArtist = document.querySelector("#dialog-artist");
const dialogStory = document.querySelector("#dialog-story");
const dialogScore = document.querySelector("#dialog-score");
const dialogLike = document.querySelector("#dialog-like");
const dialogComments = document.querySelector("#dialog-comments");
const commentForm = document.querySelector("#comment-form");
const commentInput = document.querySelector("#comment-input");

let artworks = [];
let activeFilter = "all";
let activeArtworkId = null;
let selectedFile = null;

init();

async function init() {
  await clearLegacyStorage();
  artworks = (await loadArtworks()).map(normalizeArtwork);
  render();
  void populateVisualEstimates();
}

async function clearLegacyStorage() {
  let hasLegacyArtworkData = false;

  LEGACY_STORAGE_KEYS.forEach((key) => {
    try {
      hasLegacyArtworkData ||= localStorage.getItem(key) !== null;
      localStorage.removeItem(key);
    } catch (error) {
      // Continue when browser storage is unavailable.
    }
  });

  if (!hasLegacyArtworkData) {
    return;
  }

  try {
    if (localStorage.getItem(LEGACY_IMAGE_RESET_KEY) !== "complete") {
      await deleteLegacyArtworkImages();
      localStorage.setItem(LEGACY_IMAGE_RESET_KEY, "complete");
    }
  } catch (error) {
    // The new gallery still starts empty when IndexedDB cannot be cleared.
  }
}

function deleteLegacyArtworkImages() {
  return new Promise((resolve) => {
    try {
      const request = indexedDB.deleteDatabase(IMAGE_DB_NAME);
      request.addEventListener("success", resolve, { once: true });
      request.addEventListener("error", resolve, { once: true });
      request.addEventListener("blocked", resolve, { once: true });
    } catch (error) {
      resolve();
    }
  });
}

function setSelectedFile(file) {
  if (!file) {
    selectedFile = null;
    fileName.textContent = "Choose or drop image";
    return;
  }

  selectedFile = file;
  fileName.textContent = file.name;
}

artworkFile.addEventListener("change", () => {
  const file = artworkFile.files?.[0];
  setSelectedFile(file);
});

fileDrop.addEventListener("dragover", (event) => {
  event.preventDefault();
  fileDrop.classList.add("is-dragging");
});

fileDrop.addEventListener("dragleave", () => {
  fileDrop.classList.remove("is-dragging");
});

fileDrop.addEventListener("drop", (event) => {
  event.preventDefault();
  fileDrop.classList.remove("is-dragging");
  setSelectedFile(event.dataTransfer?.files?.[0]);
});

artworkForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const file = selectedFile || artworkFile.files?.[0];

  if (!file) {
    alert("Choose an image before submitting.");
    artworkFile.focus();
    return;
  }

  if (!file.type.startsWith("image/")) {
    alert("Upload an image file.");
    return;
  }

  const submitButton = artworkForm.querySelector(".submit-button");
  submitButton.disabled = true;
  submitButton.textContent = "Hanging...";

  try {
    const imageBlob = await fileToGalleryImageBlob(file);
    const formData = new FormData(artworkForm);
    const id = createId();
    const visualScore = await estimateVisualScore(imageBlob);
    await saveUploadedImage(id, imageBlob);

    const artwork = {
      id,
      title: cleanText(formData.get("art-title")) || "Untitled Artwork",
      artist: cleanText(formData.get("artist-name")) || "Anonymous Artist",
      mood: formData.get("art-mood") || "abstract",
      image: URL.createObjectURL(imageBlob),
      imageStorage: "indexedDB",
      imageKey: id,
      story: cleanText(formData.get("art-story")) || "The artist has left the outside story open for now.",
      likes: 0,
      visualScore,
      visualScoreState: visualScore === null ? "unavailable" : "ready",
      comments: [],
    };

    artworks = [artwork, ...artworks];
    activeFilter = "all";
    saveArtworks();
    artworkForm.reset();
    selectedFile = null;
    fileName.textContent = "Choose or drop image";
    render();
    document.querySelector("#gallery").scrollIntoView({ behavior: "smooth" });
    openArtwork(artwork.id);
  } catch (error) {
    alert("This image cannot be uploaded right now. Try another file.");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Hang on the Wall";
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    renderGallery();
    updateFilters();
  });
});

closeDialog.addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});

dialogLike.addEventListener("click", () => {
  if (!activeArtworkId) {
    return;
  }
  addLike(activeArtworkId);
  renderDialog(activeArtworkId);
  renderGallery();
  renderCommentStream();
});

commentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!activeArtworkId) {
    return;
  }

  const text = cleanText(commentInput.value);
  if (!text) {
    return;
  }

  const artwork = artworks.find((item) => item.id === activeArtworkId);
  artwork.comments.unshift({ text, at: "Just now" });
  commentInput.value = "";
  saveArtworks();
  renderDialog(activeArtworkId);
  renderGallery();
  renderCommentStream();
});

function render() {
  updateFilters();
  renderGallery();
  renderCommentStream();
}

function renderGallery() {
  galleryGrid.innerHTML = "";
  const visibleArtworks =
    activeFilter === "all"
      ? artworks
      : artworks.filter((artwork) => artwork.mood === activeFilter);

  if (!visibleArtworks.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No artworks yet. Upload the first piece to open the exhibition.";
    galleryGrid.append(empty);
    return;
  }

  visibleArtworks.forEach((artwork) => {
    const card = cardTemplate.content.firstElementChild.cloneNode(true);
    const image = card.querySelector(".artwork-image");
    const artworkButton = card.querySelector(".artwork-button");
    const likeButton = card.querySelector(".card-like");
    const commentButton = card.querySelector(".card-comment");
    const scoreChip = card.querySelector(".card-score");

    image.src = artwork.image;
    image.alt = `${artwork.title}, by ${artwork.artist}`;
    card.querySelector(".art-mood").textContent = moodLabels[artwork.mood] || "Open Room";
    card.querySelector(".art-title").textContent = artwork.title;
    card.querySelector(".art-artist").textContent = artwork.artist;
    scoreChip.textContent = visualScoreLabel(artwork);
    scoreChip.setAttribute("aria-label", visualScoreAccessibleLabel(artwork));
    likeButton.textContent = `♥ ${artwork.likes}`;
    commentButton.textContent = `✎ ${artwork.comments.length}`;
    likeButton.setAttribute("aria-label", `Add a like to ${artwork.title}. ${artwork.likes} likes so far.`);
    commentButton.setAttribute("aria-label", `Comment on ${artwork.title}`);

    artworkButton.addEventListener("click", () => openArtwork(artwork.id));
    likeButton.addEventListener("click", () => {
      addLike(artwork.id);
      renderGallery();
      renderCommentStream();
    });
    commentButton.addEventListener("click", () => openArtwork(artwork.id, true));

    galleryGrid.append(card);
  });
}

function renderCommentStream() {
  const comments = artworks
    .flatMap((artwork) =>
      artwork.comments.map((comment) => ({
        ...comment,
        title: artwork.title,
      })),
    )
    .slice(0, 5);

  commentStream.innerHTML = "";

  if (!comments.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No comments yet.";
    commentStream.append(empty);
    return;
  }

  comments.forEach((comment) => {
    const item = document.createElement("article");
    item.className = "stream-item";
    item.innerHTML = `
      <strong>${escapeHtml(comment.title)}</strong>
      <p>${escapeHtml(comment.text)}</p>
    `;
    commentStream.append(item);
  });
}

function openArtwork(id, focusComment = false) {
  activeArtworkId = id;
  renderDialog(id);

  if (!dialog.open) {
    dialog.showModal();
  }

  if (focusComment) {
    window.setTimeout(() => commentInput.focus(), 120);
  }
}

function renderDialog(id) {
  const artwork = artworks.find((item) => item.id === id);
  if (!artwork) {
    return;
  }

  dialogImage.src = artwork.image;
  dialogImage.alt = `${artwork.title}, by ${artwork.artist}`;
  dialogMood.textContent = moodLabels[artwork.mood] || "Open Room";
  dialogTitle.textContent = artwork.title;
  dialogArtist.textContent = `By ${artwork.artist}`;
  dialogStory.textContent = artwork.story;
  dialogScore.textContent = visualScoreValue(artwork);
  dialogLike.textContent = `♥ Like · ${artwork.likes}`;
  dialogLike.setAttribute("aria-label", `Add a like to ${artwork.title}. ${artwork.likes} likes so far.`);

  dialogComments.innerHTML = "";

  if (!artwork.comments.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No comments yet.";
    dialogComments.append(empty);
    return;
  }

  artwork.comments.forEach((comment) => {
    const item = document.createElement("article");
    item.className = "comment";
    item.innerHTML = `
      <p>${escapeHtml(comment.text)}</p>
      <small>${escapeHtml(comment.at)}</small>
    `;
    dialogComments.append(item);
  });
}

function updateFilters() {
  filterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === activeFilter);
  });
}

function addLike(id) {
  const artwork = artworks.find((item) => item.id === id);
  if (!artwork) {
    return;
  }

  artwork.likes = Math.max(0, Number.parseInt(artwork.likes, 10) || 0) + 1;
  saveArtworks();
}

async function populateVisualEstimates() {
  let changed = false;

  for (const artwork of artworks) {
    if (isValidVisualScore(artwork.visualScore) || artwork.visualScoreState === "unavailable") {
      continue;
    }

    if (!artwork.image) {
      artwork.visualScoreState = "unavailable";
      changed = true;
      continue;
    }

    const visualScore = await estimateVisualScore(artwork.image);
    if (visualScore === null) {
      artwork.visualScoreState = "unavailable";
      changed = true;
      continue;
    }

    artwork.visualScore = visualScore;
    artwork.visualScoreState = "ready";
    changed = true;
  }

  if (changed) {
    saveArtworks();
    render();
  }
}

function normalizeArtwork(artwork) {
  const normalized = {
    ...artwork,
    likes: Math.max(0, Number.parseInt(artwork.likes, 10) || 0),
  };

  delete normalized.liked;

  if (isValidVisualScore(normalized.visualScore)) {
    normalized.visualScore = Number(Number(normalized.visualScore).toFixed(1));
    normalized.visualScoreState = "ready";
  } else {
    delete normalized.visualScore;

    if (normalized.visualScoreState !== "unavailable") {
      delete normalized.visualScoreState;
    }
  }

  return normalized;
}

function isValidVisualScore(value) {
  const score = Number(value);
  return Number.isFinite(score) && score >= VISUAL_SCORE_MIN && score <= VISUAL_SCORE_MAX;
}

function visualScoreLabel(artwork) {
  if (isValidVisualScore(artwork.visualScore)) {
    return `AI score ${formatVisualScore(artwork.visualScore)}/10`;
  }

  return artwork.visualScoreState === "unavailable" ? "AI score unavailable" : "Calculating AI score…";
}

function visualScoreAccessibleLabel(artwork) {
  if (isValidVisualScore(artwork.visualScore)) {
    return `AI score: ${formatVisualScore(artwork.visualScore)} out of 10.`;
  }

  return artwork.visualScoreState === "unavailable"
    ? "AI score is unavailable for this image."
    : "AI score is being calculated.";
}

function visualScoreValue(artwork) {
  if (isValidVisualScore(artwork.visualScore)) {
    return `${formatVisualScore(artwork.visualScore)} / 10`;
  }

  return artwork.visualScoreState === "unavailable" ? "Unavailable" : "Estimating…";
}

function formatVisualScore(value) {
  return Number(value).toFixed(1);
}

async function estimateVisualScore(source) {
  try {
    const image = await loadImageForVisualEstimate(source);
    const longestSide = 72;
    const scale = Math.min(1, longestSide / Math.max(image.naturalWidth || image.width, image.naturalHeight || image.height));
    const width = Math.max(1, Math.round((image.naturalWidth || image.width) * scale));
    const height = Math.max(1, Math.round((image.naturalHeight || image.height) * scale));
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d", { willReadFrequently: true });

    if (!context) {
      return null;
    }

    canvas.width = width;
    canvas.height = height;
    context.fillStyle = "#fffaf0";
    context.fillRect(0, 0, width, height);
    context.drawImage(image, 0, 0, width, height);

    const { data } = context.getImageData(0, 0, width, height);
    const luminance = new Float32Array(width * height);
    const quadrantTotals = [0, 0, 0, 0];
    const quadrantCounts = [0, 0, 0, 0];
    let luminanceTotal = 0;
    let chromaTotal = 0;
    let edgeTotal = 0;
    let edgeCount = 0;

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const pixelIndex = y * width + x;
        const dataIndex = pixelIndex * 4;
        const red = data[dataIndex] / 255;
        const green = data[dataIndex + 1] / 255;
        const blue = data[dataIndex + 2] / 255;
        const value = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
        const chroma = Math.max(red, green, blue) - Math.min(red, green, blue);
        const quadrant = (y >= height / 2 ? 2 : 0) + (x >= width / 2 ? 1 : 0);

        luminance[pixelIndex] = value;
        luminanceTotal += value;
        chromaTotal += chroma;
        quadrantTotals[quadrant] += value;
        quadrantCounts[quadrant] += 1;

        if (x > 0) {
          edgeTotal += Math.abs(value - luminance[pixelIndex - 1]);
          edgeCount += 1;
        }

        if (y > 0) {
          edgeTotal += Math.abs(value - luminance[pixelIndex - width]);
          edgeCount += 1;
        }
      }
    }

    const pixelCount = width * height;
    const averageLuminance = luminanceTotal / pixelCount;
    const variance = luminance.reduce((total, value) => total + (value - averageLuminance) ** 2, 0) / pixelCount;
    const tonalRange = clamp(Math.sqrt(variance) / 0.26, 0, 1);
    const colourVariation = clamp(chromaTotal / pixelCount / 0.42, 0, 1);
    const texture = clamp(edgeTotal / Math.max(1, edgeCount) / 0.16, 0, 1);
    const quadrantMeans = quadrantTotals.map((total, index) => total / Math.max(1, quadrantCounts[index]));
    const quadrantVariance = quadrantMeans.reduce((total, value) => total + (value - averageLuminance) ** 2, 0) / quadrantMeans.length;
    const balance = 1 - clamp(Math.sqrt(quadrantVariance) / 0.22, 0, 1);
    const score = 1.4 + tonalRange * 2.8 + colourVariation * 2.2 + texture * 2.2 + balance * 1.4;

    return Number(clamp(score, VISUAL_SCORE_MIN, VISUAL_SCORE_MAX).toFixed(1));
  } catch (error) {
    return null;
  }
}

function loadImageForVisualEstimate(source) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const objectUrl = source instanceof Blob ? URL.createObjectURL(source) : null;

    image.addEventListener("load", () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
      resolve(image);
    });

    image.addEventListener("error", () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
      reject(new Error("Image could not be analysed"));
    });

    image.src = objectUrl || source;
  });
}

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

async function loadArtworks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved) && saved.length) {
      return await hydrateStoredImages(saved);
    }
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }

  return seedArtworks;
}

function saveArtworks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(artworks.map(serializeArtwork)));
  } catch (error) {
    alert("Browser storage is full. Likes and comments may not be saved for later.");
  }
}

function serializeArtwork(artwork) {
  const serialized = { ...artwork };

  if (serialized.imageStorage === "indexedDB") {
    serialized.image = "";
  }

  return serialized;
}

async function hydrateStoredImages(storedArtworks) {
  return Promise.all(
    storedArtworks.map(async (artwork) => {
      if (artwork.imageStorage !== "indexedDB" || !artwork.imageKey) {
        return artwork;
      }

      const imageBlob = await getUploadedImage(artwork.imageKey);
      return {
        ...artwork,
        image: imageBlob ? URL.createObjectURL(imageBlob) : "",
      };
    }),
  );
}

function cleanText(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function createId() {
  const randomUUID = globalThis.crypto?.randomUUID;
  if (typeof randomUUID === "function") {
    return randomUUID.call(globalThis.crypto);
  }

  return `art-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function fileToGalleryImageBlob(file) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Unsupported file type"));
      return;
    }

    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.addEventListener("load", () => {
      URL.revokeObjectURL(objectUrl);

      const maxSide = 1100;
      const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
      const width = Math.max(1, Math.round(image.width * scale));
      const height = Math.max(1, Math.round(image.height * scale));
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        reject(new Error("Canvas is unavailable"));
        return;
      }

      canvas.width = width;
      canvas.height = height;
      context.fillStyle = "#fffaf0";
      context.fillRect(0, 0, width, height);
      context.drawImage(image, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Image could not be compressed"));
            return;
          }

          resolve(blob);
        },
        "image/jpeg",
        0.74,
      );
    });

    image.addEventListener("error", () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Image could not be read"));
    });

    image.src = objectUrl;
  });
}

function openImageDatabase() {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      reject(new Error("IndexedDB is unavailable"));
      return;
    }

    const request = indexedDB.open(IMAGE_DB_NAME, IMAGE_DB_VERSION);

    request.addEventListener("upgradeneeded", () => {
      const database = request.result;

      if (!database.objectStoreNames.contains(IMAGE_STORE_NAME)) {
        database.createObjectStore(IMAGE_STORE_NAME);
      }
    });

    request.addEventListener("success", () => resolve(request.result));
    request.addEventListener("error", () => reject(request.error || new Error("Could not open image database")));
  });
}

async function saveUploadedImage(key, imageBlob) {
  const database = await openImageDatabase();

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(IMAGE_STORE_NAME, "readwrite");
    transaction.objectStore(IMAGE_STORE_NAME).put(imageBlob, key);
    transaction.addEventListener("complete", () => {
      database.close();
      resolve();
    });
    transaction.addEventListener("error", () => {
      database.close();
      reject(transaction.error || new Error("Could not save image"));
    });
  });
}

async function getUploadedImage(key) {
  try {
    const database = await openImageDatabase();

    return await new Promise((resolve) => {
      const transaction = database.transaction(IMAGE_STORE_NAME, "readonly");
      const request = transaction.objectStore(IMAGE_STORE_NAME).get(key);
      request.addEventListener("success", () => resolve(request.result || null));
      request.addEventListener("error", () => resolve(null));
      transaction.addEventListener("complete", () => database.close());
      transaction.addEventListener("error", () => database.close());
    });
  } catch (error) {
    return null;
  }
}
