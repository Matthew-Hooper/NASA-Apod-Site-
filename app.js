const img = document.querySelector('.img')
const img_wrapper = document.querySelector('.img-wrapper');
const desc = document.querySelector('.description'); 
const modal = document.querySelector('.modal');
const hd = document.querySelector('.full-img');
const imgText = document.querySelector('.title');
const vid_wrapper = document.querySelector('.video-wrapper');
const video = document.querySelector('.video');
const caption = document.querySelector('.caption');

// NASA Apod API = https://api.nasa.gov/planetary/apod
// Can have date (YYYY-MM-DD), hd (bool), and API_KEY as parameters

function getApod() {
    const api_base = 'https://api.nasa.gov/planetary/apod';
    const api_key = 'UAkwv6lx8anyfS9Ncbb69ShdhD8dFIRtJIrsiO0K';
    
    // Fetch and update dynamically
    fetch(`${api_base}?date=2020-08-22&api_key=${api_key}`)
    .then(response => response.json())
    .then(data => {
        img.src = data.url,
        img.alt = data.title,
        desc.innerText = data.explanation,
        video.src = data.url  
        if (data.media_type === "image") {
            // Open hd image and add open classes
            img.addEventListener('click', () => {
                modal.classList.add("open");
                hd.classList.add("open");
                hd.src = data.hdurl;
                hd.alt = data.title;
                imgText.textContent = hd.alt;
                desc.classList.add("open");
            });
            
            // Close hd image and remove classes
            modal.addEventListener('click', (e) => {
                if(e.target.classList.contains('modal')) {
                    modal.classList.remove("open");
                    hd.classList.remove("open");
                    desc.classList.remove("open");
                }
            });
        } else {
            img_wrapper.style.display = "none";
            vid_wrapper.style.display = "inline-block";
            caption.style.bottom = "20%";
        }
    })
    .catch (error => {
        console.error('Error:', error);
    })
}

getApod();