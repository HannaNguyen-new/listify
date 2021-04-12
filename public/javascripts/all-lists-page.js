

const list = document.querySelectorAll(".list");
list.forEach(el => el.addEventListener("click", () => {
    const id = el.getAttribute("id");
    const url = window.location.href + "/" + id;
    axios.get(url).then(res => window.location.href = res.data)

}))