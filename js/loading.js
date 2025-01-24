// Variables for the videos and loading screen
const videoOne = document.getElementById("videoOne");
const videoTwo = document.getElementById("videoTwo");
const loadingBar = document.getElementById("loadingBar");
const loadingText = document.getElementById("loadingText");
const loadingScreen = document.getElementById("loadingScreen");

if (!loadingBar || !loadingText || !loadingScreen) {
  console.error("Loading bar, text, or screen elements are missing!");
} else {
  let progress = 0;
  const totalTime = 4500;
  const intervalTime = 50;
  const increment = 100 / (totalTime / intervalTime);

  const loadingInterval = setInterval(() => {
    progress += increment;
    loadingBar.style.width = `${progress}%`;

    if (progress < 100) {
      loadingText.textContent = "Scanning For Whiteness...";
    } else {
      clearInterval(loadingInterval);
      loadingText.textContent = "100% White VRIL Detected.";
      setTimeout(() => {
        loadingScreen.style.display = "none"; // Hide the loading screen
      }, 1500);
    }
  }, intervalTime);
}

// Event listener for the first video (UFO video)
if (videoOne && videoTwo) {
  videoOne.addEventListener("ended", () => {
    videoOne.style.display = "none"; // Hide the first video
    videoTwo.style.display = "block"; // Show the second video
    videoTwo.play(); // Start the looping video (Greek Repeater)
  });
} else {
  console.error("Video elements are missing!");
}

// Delay logo appearance
setTimeout(() => {
  const logoContainer = document.getElementById("logoContainer");
  if (logoContainer) {
    logoContainer.style.opacity = "1"; // Make the logo visible
    logoContainer.style.transition = "opacity 2s ease-in-out"; // Smooth fade-in
  } else {
    console.error("Logo container is missing!");
  }
}, 7000); // 7 seconds

// Smooth scroll animation for section snapping
let isScrolling = false;

window.addEventListener('wheel', (event) => {
    if (isScrolling) return; // Prevent multiple scrolls
    isScrolling = true;

    const sectionOne = document.querySelector('.section-one');
    const sectionTwo = document.querySelector('.section-two');

    // Determine scroll direction
    if (event.deltaY > 0) {
        // Scroll down to NFT video section
        sectionTwo.scrollIntoView({ behavior: 'smooth' });
    } else {
        // Scroll up to Greek Repeater video section
        sectionOne.scrollIntoView({ behavior: 'smooth' });
    }

    // Debounce to prevent multiple scrolls
    setTimeout(() => {
        isScrolling = false;
    }, 1000); // Adjust the timeout duration as needed
});
// NFT Video Scroll and Play Functionality
const nftVideo = document.querySelector('.nft-video');
const nftVideoSection = document.querySelector('.section-two');

// Play video when it comes into view
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Play the NFT video when it comes into view
        nftVideo.play();
      } else {
        // Pause the NFT video when it goes out of view
        nftVideo.pause();
      }
    });
  },
  {
    threshold: 0.5, // Trigger when 50% of the video is visible
  }
);

// Observe the NFT video section
observer.observe(nftVideoSection);

window.addEventListener('load', () => {
  const videoTwo = document.getElementById('videoTwo');
  
  // Show and play second video after first video loads
  videoOne.addEventListener('loadeddata', () => {
      videoTwo.style.display = 'block';
      videoTwo.play().catch(error => {
          console.log('Video playback failed:', error);
      });
  });

  // Optional: Add resize listener for better mobile handling
  window.addEventListener('resize', () => {
      videoTwo.style.left = '0';
      videoTwo.style.width = '100%';
  });
});
