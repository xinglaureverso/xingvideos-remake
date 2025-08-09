// Extract video ID from URL
const urlParams = new URLSearchParams(window.location.search);
const videoId = urlParams.get("video");

// Simulated local videos
const localVideos = {
  1: {
    title: "Video 1",
    src: "../assets/videos/1.mp4",
    description: "This is local video number 1",
    views: 100.574.017,
    likes: 1791,
    comments: []
  },
  2: {
    title: "Local Video 2",
    src: "../assets/videos/video2.mp4",
    description: "This is local video number 2",
    views: 0,
    likes: 0,
    comments: []
  }
};

// Load posted videos from localStorage
const postedVideos = JSON.parse(localStorage.getItem("videos")) || {};

// Merge both sources
const allVideos = { ...localVideos, ...postedVideos };

// Check if video exists
const videoData = allVideos[videoId];

if (!videoData) {
  document.body.innerHTML = `<h2>This video or user ${videoId} does not exist 😢</h2>`;
} else {
  // Update player
  const player = document.getElementById("player");
  player.src = videoData.src;

  // Update visual info
  document.getElementById("video-title").textContent = videoData.title;
  document.getElementById("video-description").textContent = videoData.description;
  document.getElementById("video-views").textContent = `${videoData.views} views`;
  document.getElementById("like-count").textContent = videoData.likes;

  // Increment views
  videoData.views++;
  document.getElementById("video-views").textContent = `${videoData.views} views`;

  // Update localStorage if it's a posted video
  if (postedVideos[videoId]) {
    postedVideos[videoId] = videoData;
    localStorage.setItem("videos", JSON.stringify(postedVideos));
  }

  // Like button
  document.getElementById("like-btn").addEventListener("click", () => {
    videoData.likes++;
    document.getElementById("like-count").textContent = videoData.likes;

    if (postedVideos[videoId]) {
      postedVideos[videoId] = videoData;
      localStorage.setItem("videos", JSON.stringify(postedVideos));
    }
  });

  // Comments
  const commentList = document.getElementById("comment-list");
  const commentForm = document.getElementById("comment-form");
  const commentInput = document.getElementById("comment-input");

  function renderComments() {
    commentList.innerHTML = "";
    videoData.comments.forEach((comment) => {
      const li = document.createElement("li");
      li.textContent = comment;
      commentList.appendChild(li);
    });
  }

  renderComments();

  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const comment = commentInput.value.trim();
    if (comment) {
      videoData.comments.push(comment);
      commentInput.value = "";
      renderComments();

      if (postedVideos[videoId]) {
        postedVideos[videoId] = videoData;
        localStorage.setItem("videos", JSON.stringify(postedVideos));
      }
    }
  });
}

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  const player = document.getElementById("player");

  switch (e.key) {
    case " ":
      e.preventDefault();
      player.paused ? player.play() : player.pause();
      break;
    case "ArrowRight":
      player.currentTime += 5;
      break;
    case "ArrowLeft":
      player.currentTime -= 5;
      break;
    case "ArrowUp":
      player.volume = Math.min(player.volume + 0.1, 1);
      break;
    case "ArrowDown":
      player.volume = Math.max(player.volume - 0.1, 0);
      break;
    case "f":
    case "F":
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        player.requestFullscreen();
      }
      break;
    case "m":
    case "M":
      player.muted = !player.muted;
      break;
    default:
      if (!isNaN(e.key) && e.key >= "0" && e.key <= "9") {
        const percent = parseInt(e.key) / 10;
        player.currentTime = player.duration * percent;
      }
      break;
  }
});

// Sidebar toggle
document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const menuButton = document.getElementById("menu-button");

  menuButton.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });
});
