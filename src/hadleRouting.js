export const handleRouting = (event) => {
    let active = document.querySelector(".activeNavOption");
    if (active) active.classList.remove("activeNavOption");
    event.currentTarget.classList.add("activeNavOption");
}