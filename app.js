const STORAGE_KEY = "oil-salon-artworks-v7";
const LEGACY_STORAGE_KEYS = [
  "oil-salon-artworks-v1",
  "oil-salon-artworks-v2",
  "oil-salon-artworks-v3",
  "oil-salon-artworks-v4",
  "oil-salon-artworks-v5",
  "oil-salon-artworks-v6",
];
const LEGACY_IMAGE_RESET_KEY = "oil-salon-images-reset-v7";
const IMAGE_DB_NAME = "oil-salon-image-store";
const IMAGE_DB_VERSION = 1;
const IMAGE_STORE_NAME = "uploaded-images";
const VISUAL_SCORE_MIN = 1;
const VISUAL_SCORE_MAX = 10;
const PUBLIC_FEEDBACK_RPC = "https://rviwoisnpjkoadbsniuz.supabase.co/rest/v1/rpc";
// Publishable Supabase keys are designed for browser use. The database only
// exposes three tightly-scoped RPC functions to this key; no table is public.
const PUBLIC_FEEDBACK_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2aXdvaXNucGprb2FkYnNuaXV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQwOTg2NzgsImV4cCI6MjA5OTY3NDY3OH0.HF_4N0ftJHFZJQK-hFTuYXCVhG0JqNmdgCMaX8wpOn0";
const PUBLIC_FEEDBACK_VISITOR_KEY = "oil-salon-public-feedback-visitor-v1";
const PUBLIC_FEEDBACK_POLL_MS = 3000;

const initialPublicLikes = {
  "wechat-img-185": 34, "wechat-img-207": 55, "wechat-img-217": 62, "wechat-img-226": 8,
  "wechat-img-190": 23, "wechat-img-208": 17, "wechat-img-218": 45, "wechat-img-227": 11,
  "wechat-img-202": 3, "wechat-img-209": 44, "wechat-img-219": 51, "wechat-img-228": 3,
  "wechat-img-203": 1, "wechat-img-211": 33, "wechat-img-220": 7, "wechat-img-229": 17,
  "wechat-img-212": 73, "wechat-img-221": 8, "wechat-img-231": 2, "wechat-img-213": 57,
  "wechat-img-222": 29, "wechat-img-232": 37, "wechat-img-204": 20, "wechat-img-214": 9,
  "wechat-img-223": 8, "wechat-img-233": 2, "wechat-img-205": 12, "wechat-img-215": 59,
  "wechat-img-224": 30, "wechat-img-234": 5, "wechat-img-206": 46, "wechat-img-216": 28,
  "wechat-img-225": 6, "wechat-img-235": 1, "justin-h-happy": 34, "justin-h-nervious": 45,
  "justin-h-hope": 49, "justin-h-chaos": 12, "justin-h-scare": 88, "justin-h-waste": 68,
  "justin-h-sad": 52, "justin-h-confused": 9, "justin-h-choice": 23, "wechat-img-864": 8,
  "wechat-img-865": 22, "wechat-img-866": 37, "wechat-img-1766": 0, "wechat-img-1765": 1,
  "wechat-img-1764": 2, "wechat-img-863": 0,
};

const moodLabels = {
  landscape: "Landscape Room",
  "still-life": "Still Life Room",
  city: "City Room",
  figure: "Figure Room",
  abstract: "Abstract Room",
};

// These are bundled with the published site, so every visitor receives the
// same 50-work exhibition. Public likes and comments are refreshed from the
// shared exhibition service after the first paint.
const seedArtworks = [
  { id: "wechat-img-185", title: "The Painting in the Room", artist: "FrameHunter", mood: "landscape", image: "assets/artworks/01-wechat-img-185.webp", story: "A room, a landscape, and a frame that refuses to stay quiet.", likes: 0, comments: [] },
  { id: "wechat-img-207", title: "Snow Has No Memory", artist: "Nº 9 / north", mood: "landscape", image: "assets/artworks/02-wechat-img-207.webp", story: "snow + blue + one impossible horizon.", likes: 0, comments: [] },
  { id: "wechat-img-217", title: "Bouquet, Still Listening", artist: "Bibi_花", mood: "still-life", image: "assets/artworks/03-wechat-img-217.webp", story: "Formally arranged, emotionally everywhere.", likes: 0, comments: [] },
  { id: "wechat-img-226", title: "Quiet at the Window", artist: "E. Vasseur", mood: "figure", image: "assets/artworks/04-wechat-img-226.webp", story: "A paused gesture rendered with unusual tenderness.", likes: 0, comments: [] },
  { id: "wechat-img-190", title: "Small Things, Loud Room", artist: "table_ghost", mood: "still-life", image: "assets/artworks/05-wechat-img-190.webp", story: "shelf objects having a better social life than me.", likes: 0, comments: [] },
  { id: "wechat-img-208", title: "Three Vessels After Noon", artist: "Sorin D.", mood: "still-life", image: "assets/artworks/06-wechat-img-208.webp", story: "A compact still life in which brass carries the entire conversation.", likes: 0, comments: [] },
  { id: "wechat-img-218", title: "Flowers Were Here First", artist: "floral emergency", mood: "still-life", image: "assets/artworks/07-wechat-img-218.webp", story: "please do not call these “just flowers.”", likes: 0, comments: [] },
  { id: "wechat-img-227", title: "Garden With No Exit", artist: "Lila M.", mood: "landscape", image: "assets/artworks/08-wechat-img-227.webp", story: "green, pink, and a slightly suspicious amount of peace.", likes: 0, comments: [] },
  { id: "wechat-img-202", title: "Blue Flowers, No Filter", artist: "BlueRoom_404", mood: "still-life", image: "assets/artworks/09-wechat-img-202.webp", story: "blue bouquet; zero need for extra drama.", likes: 0, comments: [] },
  { id: "wechat-img-209", title: "Yellow Weather", artist: "Soleil??", mood: "landscape", image: "assets/artworks/10-wechat-img-209.webp", story: "the yellow is yelling. respectfully.", likes: 0, comments: [] },
  { id: "wechat-img-219", title: "Street With a Long Shadow", artist: "A. Kovač", mood: "city", image: "assets/artworks/11-wechat-img-219.webp", story: "Perspective narrows until the street feels like a memory.", likes: 0, comments: [] },
  { id: "wechat-img-228", title: "The Seat by the Wall", artist: "Mina’s cousin", mood: "figure", image: "assets/artworks/12-wechat-img-228.webp", story: "She looks away; the painting does not.", likes: 0, comments: [] },
  { id: "wechat-img-203", title: "Green Wallpaper, White Dress", artist: "Mlle. R.", mood: "figure", image: "assets/artworks/13-wechat-img-203.webp", story: "A portrait built from quiet fabric, distance, and almost no explanation.", likes: 0, comments: [] },
  { id: "wechat-img-211", title: "Mountains on Fast Forward", artist: "山脈", mood: "landscape", image: "assets/artworks/14-wechat-img-211.webp", story: "⛰ × 3 / saturation: fearless", likes: 0, comments: [] },
  { id: "wechat-img-220", title: "Two Faces, One Car", artist: "CUB3", mood: "abstract", image: "assets/artworks/15-wechat-img-220.webp", story: "Two faces, sharp corners, no small talk.", likes: 0, comments: [] },
  { id: "wechat-img-229", title: "Purple Coat, Blue Noise", artist: "p.senn", mood: "figure", image: "assets/artworks/16-wechat-img-229.webp", story: "purple coat, blue air, main-character energy.", likes: 0, comments: [] },
  { id: "wechat-img-212", title: "Bubbles Under Glass", artist: "Qing / 青", mood: "still-life", image: "assets/artworks/17-wechat-img-212.webp", story: "09:12 / glass, flowers, moonlight-ish", likes: 0, comments: [] },
  { id: "wechat-img-221", title: "The Man Who Waited", artist: "Mr. T.", mood: "figure", image: "assets/artworks/18-wechat-img-221.webp", story: "His beard has seen more than this exhibition.", likes: 0, comments: [] },
  { id: "wechat-img-231", title: "Hand on the Lapel", artist: "the_lapel", mood: "figure", image: "assets/artworks/19-wechat-img-231.webp", story: "tie adjusted. dignity activated.", likes: 0, comments: [] },
  { id: "wechat-img-213", title: "Gold Over the Canal", artist: "B. Moretti", mood: "city", image: "assets/artworks/20-wechat-img-213.webp", story: "gold water doing what gold water does.", likes: 0, comments: [] },
  { id: "wechat-img-222", title: "Edge of a Bad Storm", artist: "sea-level", mood: "landscape", image: "assets/artworks/21-wechat-img-222.webp", story: "The coast is stripped back to weather, pressure, and restraint.", likes: 0, comments: [] },
  { id: "wechat-img-232", title: "Tables Remember Everything", artist: "JAMIE_199", mood: "still-life", image: "assets/artworks/22-wechat-img-232.webp", story: "Objects everywhere. Narrative loading…", likes: 0, comments: [] },
  { id: "wechat-img-204", title: "Profile Against Red", artist: "Ника", mood: "figure", image: "assets/artworks/23-wechat-img-204.webp", story: "red wall. side profile. absolutely committed.", likes: 0, comments: [] },
  { id: "wechat-img-214", title: "Last Field Before Town", artist: "R. Campos", mood: "landscape", image: "assets/artworks/24-wechat-img-214.webp", story: "wheat field, tiny houses, big summer.", likes: 0, comments: [] },
  { id: "wechat-img-223", title: "Water Remembers the Houses", artist: "cloudywater", mood: "city", image: "assets/artworks/25-wechat-img-223.webp", story: "a canal scene with its volume turned low.", likes: 0, comments: [] },
  { id: "wechat-img-233", title: "Sunlight on the Neck", artist: "Auré", mood: "figure", image: "assets/artworks/26-wechat-img-233.webp", story: "Skin, sunlight, and the softest possible departure.", likes: 0, comments: [] },
  { id: "wechat-img-205", title: "Yellow Cap Theory", artist: "帽子先生", mood: "figure", image: "assets/artworks/27-wechat-img-205.webp", story: "hat on. mystery on.", likes: 0, comments: [] },
  { id: "wechat-img-215", title: "Harbour in Peach Light", artist: "Ciel_13", mood: "city", image: "assets/artworks/28-wechat-img-215.webp", story: "industrial skyline, but make it peach.", likes: 0, comments: [] },
  { id: "wechat-img-224", title: "One Tree, Enough Sky", artist: "TreenotTree", mood: "landscape", image: "assets/artworks/29-wechat-img-224.webp", story: "One tree carrying the whole composition.", likes: 0, comments: [] },
  { id: "wechat-img-234", title: "Nap, 2:46 PM", artist: "L. & the sofa", mood: "figure", image: "assets/artworks/30-wechat-img-234.webp", story: "do not disturb — thinking in progress.", likes: 0, comments: [] },
  { id: "wechat-img-206", title: "The Road Is Green Today", artist: "green route", mood: "landscape", image: "assets/artworks/31-wechat-img-206.webp", story: "green road, blue distance, no deadline.", likes: 0, comments: [] },
  { id: "wechat-img-216", title: "Roses at Closing Time", artist: "Rose Dept.", mood: "still-life", image: "assets/artworks/32-wechat-img-216.webp", story: "flowers after everyone has left.", likes: 0, comments: [] },
  { id: "wechat-img-225", title: "Rain Leaves the Town", artist: "0225", mood: "city", image: "assets/artworks/33-wechat-img-225.webp", story: "wet pavement > dry pavement.", likes: 0, comments: [] },
  { id: "wechat-img-235", title: "The Tie Was His Idea", artist: "A.R. / no bio", mood: "figure", image: "assets/artworks/34-wechat-img-235.webp", story: "a gentleman with excellent posture and unfinished business.", likes: 0, comments: [] },
  { id: "justin-h-happy", title: "happy", artist: "Justin H", mood: "abstract", image: "assets/artworks/35-justin-h-happy.jpg", story: "", likes: 0, comments: [] },
  { id: "justin-h-nervious", title: "nervious", artist: "Justin H", mood: "abstract", image: "assets/artworks/36-justin-h-nervious.jpg", story: "", likes: 0, comments: [] },
  { id: "justin-h-hope", title: "hope", artist: "Justin H", mood: "abstract", image: "assets/artworks/37-justin-h-hope.jpg", story: "", likes: 0, comments: [] },
  { id: "justin-h-chaos", title: "chaos", artist: "Justin H", mood: "abstract", image: "assets/artworks/38-justin-h-chaos.jpg", story: "", likes: 0, comments: [] },
  { id: "justin-h-scare", title: "scare", artist: "Justin H", mood: "abstract", image: "assets/artworks/39-justin-h-scare.jpg", story: "", likes: 0, comments: [] },
  { id: "justin-h-waste", title: "waste", artist: "Justin H", mood: "abstract", image: "assets/artworks/40-justin-h-waste.jpg", story: "", likes: 0, comments: [] },
  { id: "justin-h-sad", title: "sad", artist: "Justin H", mood: "abstract", image: "assets/artworks/41-justin-h-sad.jpg", story: "", likes: 0, comments: [] },
  { id: "justin-h-confused", title: "confused", artist: "Justin H", mood: "abstract", image: "assets/artworks/42-justin-h-confused.jpg", story: "", likes: 0, comments: [] },
  { id: "justin-h-choice", title: "choice", artist: "Justin H", mood: "abstract", image: "assets/artworks/43-justin-h-choice.jpg", story: "", likes: 0, comments: [] },
  { id: "wechat-img-864", title: "The Hand That Stayed", artist: "P. / 4:11", mood: "figure", image: "assets/artworks/44-the-hand-that-stayed.jpg", story: "thinking pose, excellent beard, zero rush.", likes: 0, comments: [] },
  { id: "wechat-img-865", title: "Where the Fields Bend", artist: "sunlit_karst", mood: "landscape", image: "assets/artworks/45-where-the-fields-bend.jpg", story: "field study: green wins again.", likes: 0, comments: [] },
  { id: "wechat-img-866", title: "A Bridge Before Evening", artist: "A. Varela", mood: "city", image: "assets/artworks/46-a-bridge-before-evening.jpg", story: "The bridge steadies the composition while water carries the town into reflection.", likes: 0, comments: [] },
  { id: "wechat-img-1766", title: "Amour (Love)", artist: "amour.exe", mood: "abstract", image: "assets/artworks/47-amour-love.jpg", story: "amour, but painted at maximum volume. 💗", likes: 0, comments: [] },
  { id: "wechat-img-1765", title: "Ribbon Has Opinions", artist: "RED_RIBBON_01", mood: "abstract", image: "assets/artworks/48-ribbon-has-opinions.jpg", story: "red mode activated / fabric refusing to behave.", likes: 0, comments: [] },
  { id: "wechat-img-1764", title: "Soft Armor, Loud Weather", artist: "C.粘", mood: "abstract", image: "assets/artworks/49-soft-armor-loud-weather.jpg", story: "texture > explanation", likes: 0, comments: [] },
  { id: "wechat-img-863", title: "Orange Flowers for a Quiet Day", artist: "Hana M.", mood: "still-life", image: "assets/artworks/50-orange-flowers-quiet-day.jpg", story: "Flowers brought to a conversation she had already left.", likes: 0, comments: [] },
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
const dialogScore = document.querySelector("#dialog-score");
const dialogLike = document.querySelector("#dialog-like");
const dialogComments = document.querySelector("#dialog-comments");
const commentForm = document.querySelector("#comment-form");
const commentInput = document.querySelector("#comment-input");

let artworks = [];
let activeFilter = "all";
let activeArtworkId = null;
let selectedFile = null;
let recentSharedComments = [];

init();

async function init() {
  await clearLegacyStorage();
  artworks = (await loadArtworks()).map(normalizeArtwork);
  render();
  void populateVisualEstimates();
  void refreshPublicFeedback();
  window.setInterval(() => void refreshPublicFeedback(), PUBLIC_FEEDBACK_POLL_MS);
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
  void addLike(activeArtworkId);
});

commentForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!activeArtworkId) {
    return;
  }

  const text = cleanText(commentInput.value);
  if (!text) {
    return;
  }

  const artwork = artworks.find((item) => item.id === activeArtworkId);
  if (!artwork) {
    return;
  }

  if (!isSharedArtwork(artwork.id)) {
    artwork.comments.unshift({ text, at: "Just now" });
    artwork.commentCount = artwork.comments.length;
    commentInput.value = "";
    saveArtworks();
    renderDialog(activeArtworkId);
    renderGallery();
    renderCommentStream();
    return;
  }

  const visitorId = getPublicFeedbackVisitorId();
  if (!visitorId) {
    alert("Comments need a modern browser session. Please refresh and try again.");
    return;
  }

  const submitButton = commentForm.querySelector("button[type='submit']");
  submitButton.disabled = true;
  commentInput.disabled = true;

  try {
    const response = await postPublicFeedback("/comments", {
      artworkId: artwork.id,
      visitorId,
      body: text,
    });
    const comment = response.comment;
    artwork.comments.unshift({ id: comment.id, text: comment.body, at: comment.createdAt });
    artwork.commentsLoaded = true;
    artwork.commentCount = (artwork.commentCount || 0) + 1;
    recentSharedComments = [
      { id: comment.id, artworkId: artwork.id, text: comment.body, at: comment.createdAt },
      ...recentSharedComments.filter((item) => item.id !== comment.id),
    ].slice(0, 5);
    commentInput.value = "";
    renderDialog(activeArtworkId);
    renderGallery();
    renderCommentStream();
    void refreshPublicFeedback();
  } catch (error) {
    alert(error.message || "Your comment could not be saved. Please try again shortly.");
  } finally {
    submitButton.disabled = false;
    commentInput.disabled = false;
  }
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
    commentButton.textContent = `✎ ${artwork.commentCount || 0}`;
    likeButton.setAttribute("aria-label", `Add a like to ${artwork.title}. ${artwork.likes} likes so far.`);
    commentButton.setAttribute("aria-label", `Comment on ${artwork.title}`);

    artworkButton.addEventListener("click", () => openArtwork(artwork.id));
    likeButton.addEventListener("click", () => {
      void addLike(artwork.id);
    });
    commentButton.addEventListener("click", () => openArtwork(artwork.id, true));

    galleryGrid.append(card);
  });
}

function renderCommentStream() {
  const comments = recentSharedComments.length
    ? recentSharedComments.map((comment) => ({
      ...comment,
      title: artworks.find((artwork) => artwork.id === comment.artworkId)?.title || "Artwork",
    }))
    : artworks
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
    const title = document.createElement("strong");
    title.textContent = comment.title;
    const body = document.createElement("p");
    body.textContent = comment.text;
    item.append(title, body);
    commentStream.append(item);
  });
}

function openArtwork(id, focusComment = false) {
  activeArtworkId = id;
  renderDialog(id);
  if (isSharedArtwork(id)) {
    void refreshPublicFeedback(id);
  }

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

  if (isSharedArtwork(artwork.id) && !artwork.commentsLoaded) {
    const loading = document.createElement("p");
    loading.className = "empty-state";
    loading.textContent = "Loading shared comments…";
    dialogComments.append(loading);
    return;
  }

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
    const body = document.createElement("p");
    body.textContent = comment.text;
    item.append(body);
    dialogComments.append(item);
  });
}

function updateFilters() {
  filterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === activeFilter);
  });
}

async function addLike(id) {
  const artwork = artworks.find((item) => item.id === id);
  if (!artwork) {
    return;
  }

  if (!isSharedArtwork(id)) {
    artwork.likes = Math.max(0, Number.parseInt(artwork.likes, 10) || 0) + 1;
    saveArtworks();
    renderGallery();
    renderCommentStream();
    if (dialog.open && activeArtworkId === id) renderDialog(id);
    return;
  }

  const visitorId = getPublicFeedbackVisitorId();
  const requestId = createRequestId();
  if (!visitorId || !requestId) {
    alert("Likes need a modern browser session. Please refresh and try again.");
    return;
  }

  artwork.likes = Math.max(0, Number.parseInt(artwork.likes, 10) || 0) + 1;
  renderGallery();
  if (dialog.open && activeArtworkId === id) renderDialog(id);

  try {
    const response = await postPublicFeedback("/likes", { artworkId: id, visitorId, requestId });
    artwork.likes = Math.max(artwork.likes, Number(response.likeCount) || 0);
  } catch (error) {
    artwork.likes = Math.max(0, artwork.likes - 1);
    alert(error.message || "Your like could not be saved. Please try again shortly.");
  } finally {
    renderGallery();
    renderCommentStream();
    if (dialog.open && activeArtworkId === id) renderDialog(id);
  }
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
    likes: Object.hasOwn(initialPublicLikes, artwork.id)
      ? initialPublicLikes[artwork.id]
      : Math.max(0, Number.parseInt(artwork.likes, 10) || 0),
    comments: Array.isArray(artwork.comments) ? artwork.comments : [],
  };
  normalized.commentCount = Math.max(0, Number.parseInt(artwork.commentCount, 10) || normalized.comments.length);

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
    if (Array.isArray(saved)) {
      const storedArtworks = await hydrateStoredImages(saved);
      const bundledIds = new Set(seedArtworks.map((artwork) => artwork.id));
      return [...seedArtworks, ...storedArtworks.filter((artwork) => !bundledIds.has(artwork.id))];
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

function createId() {
  return createRequestId() || `art-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function createRequestId() {
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }

  if (typeof globalThis.crypto?.getRandomValues !== "function") {
    return null;
  }

  const bytes = globalThis.crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function isSharedArtwork(id) {
  return Object.hasOwn(initialPublicLikes, id);
}

function getPublicFeedbackVisitorId() {
  try {
    const stored = localStorage.getItem(PUBLIC_FEEDBACK_VISITOR_KEY);
    if (typeof stored === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(stored)) {
      return stored;
    }
    const visitorId = createRequestId();
    if (visitorId) localStorage.setItem(PUBLIC_FEEDBACK_VISITOR_KEY, visitorId);
    return visitorId;
  } catch (error) {
    return createRequestId();
  }
}

async function callPublicFeedbackRpc(functionName, body) {
  const response = await fetch(`${PUBLIC_FEEDBACK_RPC}/${functionName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: PUBLIC_FEEDBACK_KEY,
      Authorization: `Bearer ${PUBLIC_FEEDBACK_KEY}`,
    },
    body: JSON.stringify(body),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.message || payload.error || "The shared exhibition service is unavailable.");
  }
  return payload;
}

async function postPublicFeedback(path, body) {
  if (path === "/likes") {
    const likeCount = await callPublicFeedbackRpc("increment_static_gallery_likes_public", {
      p_artwork_key: body.artworkId,
      p_request_id: body.requestId,
      p_visitor_id: body.visitorId,
    });
    return { artworkId: body.artworkId, likeCount: Number(likeCount) };
  }

  if (path === "/comments") {
    const comment = await callPublicFeedbackRpc("create_static_gallery_comment_public", {
      p_artwork_key: body.artworkId,
      p_visitor_id: body.visitorId,
      p_body: body.body,
    });
    return { comment };
  }

  throw new Error("The shared exhibition service is unavailable.");
}

async function refreshPublicFeedback(artworkId = activeArtworkId) {
  try {
    const payload = await callPublicFeedbackRpc("read_static_gallery_feedback", {
      p_artwork_key: isSharedArtwork(artworkId) ? artworkId : null,
    });
    applyPublicFeedback(payload, artworkId);
  } catch (error) {
    // The bundled counts remain visible while a visitor is offline.
  }
}

function applyPublicFeedback(payload, requestedArtworkId) {
  if (!payload || !Array.isArray(payload.artworks)) return;

  const feedbackByArtworkId = new Map(
    payload.artworks.map((feedback) => [feedback.artworkId, feedback]),
  );
  artworks.forEach((artwork) => {
    const feedback = feedbackByArtworkId.get(artwork.id);
    if (!feedback) return;
    artwork.likes = Math.max(0, Number.parseInt(feedback.likeCount, 10) || 0);
    artwork.commentCount = Math.max(0, Number.parseInt(feedback.commentCount, 10) || 0);
  });

  if (Array.isArray(payload.latestComments)) {
    recentSharedComments = payload.latestComments.map((comment) => ({
      id: comment.id,
      artworkId: comment.artworkId,
      text: comment.body,
      at: comment.createdAt,
    }));
  }

  if (requestedArtworkId && Array.isArray(payload.comments)) {
    const artwork = artworks.find((item) => item.id === requestedArtworkId);
    if (artwork) {
      artwork.comments = payload.comments.map((comment) => ({
        id: comment.id,
        text: comment.body,
        at: comment.createdAt,
      }));
      artwork.commentsLoaded = true;
    }
  }

  renderGallery();
  renderCommentStream();
  if (dialog.open && activeArtworkId) renderDialog(activeArtworkId);
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
