const STORAGE_KEY = "oil-salon-artworks-v5";
const LEGACY_STORAGE_KEYS = [
  "oil-salon-artworks-v1",
  "oil-salon-artworks-v2",
  "oil-salon-artworks-v3",
  "oil-salon-artworks-v4",
];
const IMAGE_DB_NAME = "oil-salon-image-store";
const IMAGE_DB_VERSION = 1;
const IMAGE_STORE_NAME = "uploaded-images";

const moodLabels = {
  landscape: "Landscape Room",
  "still-life": "Still Life Room",
  city: "City Room",
  figure: "Figure Room",
  abstract: "Abstract Room",
};

const seedArtworks = [
  {
    id: "coastal-village",
    title: "Above the Evening Tide",
    artist: "Lin Qiao",
    mood: "landscape",
    image: "art-coastal-village.jpg",
    story: "Orange clouds press toward the water while the village is lifted by the last light.",
    likes: 38,
    liked: false,
    comments: [
      { text: "The color has real warmth, like dusk paused on canvas.", at: "Today" },
      { text: "The blue and orange contrast is especially strong.", at: "Yesterday" },
    ],
  },
  {
    id: "still-life",
    title: "Porcelain Vase and Lemons",
    artist: "Mira Shen",
    mood: "still-life",
    image: "art-still-life.jpg",
    story: "Quiet objects are lit by saturated color, like a short poem on an afternoon table.",
    likes: 52,
    liked: false,
    comments: [{ text: "The flowers and fruit both have a lively paint texture.", at: "Today" }],
  },
  {
    id: "rainy-city",
    title: "Neon After Rain",
    artist: "Zhou Wen",
    mood: "city",
    image: "art-rainy-city.jpg",
    story: "Rain recolors the street, umbrella silhouettes, and reflections until the city glows.",
    likes: 47,
    liked: false,
    comments: [
      { text: "The wet reflections feel cinematic.", at: "Today" },
      { text: "This piece has a strong visual rhythm.", at: "Three days ago" },
    ],
  },
  {
    id: "golden-horses",
    title: "Wind Over the Golden Field",
    artist: "An He",
    mood: "landscape",
    image: "art-golden-horses.jpg",
    story: "Wind runs through the grass while the sky opens like a dark curtain.",
    likes: 44,
    liked: false,
    comments: [{ text: "It has force, and it has light.", at: "Yesterday" }],
  },
  {
    id: "orchard-path",
    title: "Orchard After Rain",
    artist: "Elena Park",
    mood: "landscape",
    image: "art-orchard-path.jpg",
    story: "Wet leaves, shallow puddles, and morning light turn a quiet path into a bright green corridor.",
    likes: 41,
    liked: false,
    comments: [{ text: "The greens feel clean without becoming flat.", at: "Today" }],
  },
  {
    id: "greenhouse",
    title: "Glasshouse Morning",
    artist: "Tessa Wu",
    mood: "still-life",
    image: "art-greenhouse.jpg",
    story: "Terracotta, glass, and rain-heavy leaves hold the room in a soft morning glow.",
    likes: 36,
    liked: false,
    comments: [{ text: "The light through the glass is the strongest part for me.", at: "Yesterday" }],
  },
  {
    id: "violin-chair",
    title: "Violin on Vermilion",
    artist: "Omar Vale",
    mood: "still-life",
    image: "art-violin-chair.jpg",
    story: "A studio corner arranged around sound, sunlight, and the saturated red of velvet.",
    likes: 49,
    liked: false,
    comments: [{ text: "The chair color makes the instrument feel warmer.", at: "Today" }],
  },
  {
    id: "mountain-lake",
    title: "Violet Dawn Lake",
    artist: "Iris Calder",
    mood: "landscape",
    image: "art-mountain-lake.jpg",
    story: "Cold peaks and violet clouds meet the first gold edge of morning on the lake.",
    likes: 54,
    liked: false,
    comments: [{ text: "The reflection gives the whole work a calm structure.", at: "Two days ago" }],
  },
  {
    id: "abstract-dancer",
    title: "Figure in Motion",
    artist: "Maya Sol",
    mood: "abstract",
    image: "art-abstract-dancer.jpg",
    story: "A moving figure is reduced to color, pressure, and a few decisive dark contours.",
    likes: 33,
    liked: false,
    comments: [{ text: "The motion reads quickly even from a small thumbnail.", at: "Today" }],
  },
  {
    id: "portrait-memory",
    title: "Profile in a Red Scarf",
    artist: "Ning Yue",
    mood: "figure",
    image:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 1120'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%231758c8'/%3E%3Cstop offset='.46' stop-color='%23c8337f'/%3E%3Cstop offset='1' stop-color='%23f2b735'/%3E%3C/linearGradient%3E%3Cfilter id='paint'%3E%3CfeTurbulence baseFrequency='.018' numOctaves='4' seed='8'/%3E%3CfeDisplacementMap in='SourceGraphic' scale='18'/%3E%3C/filter%3E%3C/defs%3E%3Crect width='900' height='1120' fill='url(%23bg)'/%3E%3Cg filter='url(%23paint)' opacity='.92'%3E%3Cpath d='M342 848c-78-38-121-117-109-214 13-104 93-242 220-246 133-4 226 124 215 251-12 132-104 243-209 246-41 2-82-9-117-37Z' fill='%23f1c08e'/%3E%3Cpath d='M258 926c70-130 162-185 286-172 97 10 159 71 204 174v192H258Z' fill='%2317120f'/%3E%3Cpath d='M258 818c127 39 285 32 430-15l58 155c-175 81-353 81-533-3Z' fill='%23e0472f'/%3E%3Cpath d='M321 454c55-144 228-196 340-83 52 53 60 124 35 196-45-65-111-96-193-92-76 3-136 30-182 79-18-41-18-75 0-100Z' fill='%2324201d'/%3E%3Cpath d='M430 628c36 26 79 29 129 8' fill='none' stroke='%23713830' stroke-width='20' stroke-linecap='round'/%3E%3Cpath d='M378 572c24-15 50-15 78 0M545 566c29-12 55-9 78 8' fill='none' stroke='%2317120f' stroke-width='15' stroke-linecap='round'/%3E%3C/g%3E%3C/svg%3E",
    story: "Heavy blocks of color catch the second before a figure turns away.",
    likes: 29,
    liked: false,
    comments: [{ text: "The red is immediate, and the mood is clear.", at: "Today" }],
  },
  {
    id: "abstract-field",
    title: "Untitled Blue",
    artist: "Kai Mo",
    mood: "abstract",
    image:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 900'%3E%3Cdefs%3E%3Cfilter id='rough'%3E%3CfeTurbulence baseFrequency='.025' numOctaves='5' seed='12'/%3E%3CfeDisplacementMap in='SourceGraphic' scale='34'/%3E%3C/filter%3E%3C/defs%3E%3Crect width='1200' height='900' fill='%23fff5db'/%3E%3Cg filter='url(%23rough)'%3E%3Cpath d='M-70 601C186 513 354 505 537 590c197 91 413 89 738-98v484H-70Z' fill='%231758c8'/%3E%3Cpath d='M-40 396c204-96 379-101 526-17 167 96 343 99 762-68v286c-321 120-563 121-742 25-161-87-344-81-546 15Z' fill='%2308745f' opacity='.92'/%3E%3Cpath d='M-20 254c247-92 438-83 571 31 147 126 312 135 653 2v153c-315 94-531 88-685-26-143-107-316-117-539-32Z' fill='%23e0472f' opacity='.9'/%3E%3Cpath d='M95 691c160-152 324-219 493-201 215 23 352-55 527-240' fill='none' stroke='%23f2b735' stroke-width='58' stroke-linecap='round' opacity='.88'/%3E%3Cpath d='M67 181c215 56 396 51 542-16 171-78 353-76 544 8' fill='none' stroke='%23c8337f' stroke-width='46' stroke-linecap='round' opacity='.78'/%3E%3C/g%3E%3C/svg%3E",
    story: "Saturated bands of color push against each other like an unexplained tide.",
    likes: 31,
    liked: false,
    comments: [{ text: "This would work well at a large scale.", at: "Yesterday" }],
  },
];

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
  clearLegacyStorage();
  artworks = await loadArtworks();
  render();
}

function clearLegacyStorage() {
  LEGACY_STORAGE_KEYS.forEach((key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      // Ignore cleanup failures; the current version still avoids storing images in localStorage.
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
      liked: false,
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
  toggleLike(activeArtworkId);
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
    empty.textContent = "This room is still waiting for its first artwork.";
    galleryGrid.append(empty);
    return;
  }

  visibleArtworks.forEach((artwork) => {
    const card = cardTemplate.content.firstElementChild.cloneNode(true);
    const image = card.querySelector(".artwork-image");
    const artworkButton = card.querySelector(".artwork-button");
    const likeButton = card.querySelector(".card-like");
    const commentButton = card.querySelector(".card-comment");

    image.src = artwork.image;
    image.alt = `${artwork.title}, by ${artwork.artist}`;
    card.querySelector(".art-mood").textContent = moodLabels[artwork.mood] || "Open Room";
    card.querySelector(".art-title").textContent = artwork.title;
    card.querySelector(".art-artist").textContent = artwork.artist;
    likeButton.textContent = `${artwork.liked ? "♥" : "♡"} ${artwork.likes}`;
    commentButton.textContent = `✎ ${artwork.comments.length}`;
    likeButton.classList.toggle("is-liked", artwork.liked);
    likeButton.setAttribute("aria-label", `${artwork.liked ? "Unlike" : "Like"} ${artwork.title}`);
    commentButton.setAttribute("aria-label", `Comment on ${artwork.title}`);

    artworkButton.addEventListener("click", () => openArtwork(artwork.id));
    likeButton.addEventListener("click", () => {
      toggleLike(artwork.id);
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
  dialogLike.textContent = `${artwork.liked ? "♥ Liked" : "♡ Like"} · ${artwork.likes}`;
  dialogLike.classList.toggle("is-liked", artwork.liked);

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

function toggleLike(id) {
  const artwork = artworks.find((item) => item.id === id);
  if (!artwork) {
    return;
  }

  artwork.liked = !artwork.liked;
  artwork.likes += artwork.liked ? 1 : -1;
  artwork.likes = Math.max(0, artwork.likes);
  saveArtworks();
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
