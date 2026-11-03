const skills = [
    {
        name: "HTML5",
        level: "good"
    },
    {
        name: "CSS3",
        level: "good"
    },
    {
        name: "JavaScript",
        level: "basic"
    },
    {
        name: "SCSS",
        level: "basic"
    }
];

const skillList = document.querySelector("#skill-list");
const skillFilter = document.querySelector("#skill-filter");

const renderSkills = (data) => {
    skillList.innerHTML = data.map(skill => `
        <article class="skill-card">
            <h3>${skill.name}</h3>
            <p>Mức độ: ${skill.level}</p>
        </article>
    `).join("");
};

skillFilter.addEventListener("change", () => {
    const selected = skillFilter.value;

    const filteredSkills = selected === "all"
        ? skills
        : skills.filter(skill => skill.level === selected);

    renderSkills(filteredSkills);
});

renderSkills(skills);

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }

    const name = document.querySelector("#fullname").value.trim();
    const email = document.querySelector("#email").value.trim();
    const phone = document.querySelector("#phone").value.trim();
    const message = document.querySelector("#message").value.trim();

    if (!name || !email || !phone || !message) {
        formStatus.textContent = "Vui lòng nhập đầy đủ thông tin.";
        return;
    }

    formStatus.textContent = "Thông tin đã được kiểm tra thành công!";
    contactForm.reset();
});

const projectList = document.querySelector("#project-list");
const projectStatus = document.querySelector("#project-status");

async function loadProjects() {
    try {
        projectStatus.textContent = "Đang tải dự án...";

        const response = await fetch("./js/data.json");

        if (!response.ok) {
            throw new Error("Không thể tải dữ liệu dự án.");
        }

        const projects = await response.json();

        projectList.innerHTML = projects.map(project => `
            <article class="project-card">
                <h3>${project.ten}</h3>
                <p>Công nghệ: ${project.congNghe}</p>
                <small>Năm hoàn thành: ${project.namHoanThanh}</small>
            </article>
        `).join("");

        projectStatus.textContent = "Đã tải dự án thành công.";

    } catch (error) {
        console.error("Lỗi tải dữ liệu:", error);

        projectStatus.textContent =
            "Không thể tải dự án. Vui lòng kiểm tra kết nối hoặc đường dẫn.";
    }
}

loadProjects();


const themeButton = document.querySelector("#theme-toggle");


const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeButton.setAttribute("aria-pressed", "true");
}

themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    
    localStorage.setItem(
        "theme",
        isDark ? "dark" : "light"
    );

    themeButton.setAttribute("aria-pressed", String(isDark));
});