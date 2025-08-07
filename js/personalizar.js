// personalizar.js

function saveCustomization() {
  const user = localStorage.getItem("loggedInUser");
  if (!user) return alert("Você precisa estar logado.");

  const name = document.getElementById("channel-name-input").value.trim();
  const photoFile = document.getElementById("photo-upload").files[0];
  const bannerFile = document.getElementById("banner-upload").files[0];

  const readerPhoto = new FileReader();
  const readerBanner = new FileReader();

  const profileData = {};

  readerPhoto.onload = function () {
    profileData.photo = readerPhoto.result;
    readerBanner.onload = function () {
      profileData.banner = readerBanner.result;
      profileData.name = name || "Seu Canal";

      localStorage.setItem(`profile_${user}`, JSON.stringify(profileData));
      alert("Personalização salva com sucesso!");
      window.location.href = "../studio.html";
    };

    if (bannerFile) {
      readerBanner.readAsDataURL(bannerFile);
    } else {
      profileData.banner = "../assets/banner.png";
      profileData.name = name || "Seu Canal";
      localStorage.setItem(`profile_${user}`, JSON.stringify(profileData));
      alert("Personalização salva com sucesso!");
      window.location.href = "../studio.html";
    }
  };

  if (photoFile) {
    readerPhoto.readAsDataURL(photoFile);
  } else {
    profileData.photo = "../assets/login.jpg";
    if (bannerFile) {
      readerBanner.readAsDataURL(bannerFile);
    } else {
      profileData.banner = "../assets/banner.png";
      profileData.name = name || "Seu Canal";
      localStorage.setItem(`profile_${user}`, JSON.stringify(profileData));
      alert("Personalização salva com sucesso!");
      window.location.href = "../studio.html";
    }
  }
}
