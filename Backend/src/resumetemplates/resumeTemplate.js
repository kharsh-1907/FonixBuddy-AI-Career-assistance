const resumeTemplate = ({
    name,
    headline,
    summary,
    skills,
    projects,
    education,
    experience,
    additional
}) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">

    <style>
        @page {
            size: A4;
            margin: 15mm;
        }

        body {
            font-family: Arial, Helvetica, sans-serif;
            color: #222;
            font-size: 11px;
            line-height: 1.35;
            margin: 0;
        }

        .header {
            text-align: center;
            margin-bottom: 14px;
        }

        .name {
            font-size: 25px;
            font-weight: bold;
            margin-bottom: 4px;
        }

        .headline {
            font-size: 12px;
            color: #444;
        }

        .section {
            margin-top: 13px;
        }

        .section-title {
            font-size: 13px;
            font-weight: bold;
            border-bottom: 1px solid #222;
            padding-bottom: 3px;
            margin-bottom: 6px;
        }

        .skill-row {
            margin-bottom: 3px;
        }

        .skill-title {
            font-weight: bold;
            display: inline;
        }

        .project {
            margin-bottom: 8px;
        }

        .project-title {
            font-weight: bold;
            margin-bottom: 2px;
        }

        .education-title,
        .experience-title {
            font-weight: bold;
        }

        .date {
            color: #555;
        }

        ul {
            margin: 4px 0 0 18px;
            padding: 0;
        }

        li {
            margin-bottom: 3px;
        }
    </style>
</head>

<body>

    <div class="header">
        <div class="name">${name}</div>
        <div class="headline">${headline}</div>
    </div>

    <div class="section">
        <div class="section-title">SUMMARY</div>
        <div>${summary}</div>
    </div>

    <div class="section">
        <div class="section-title">TECHNICAL SKILLS</div>

        ${skills.map(skill => `
            <div class="skill-row">
                <span class="skill-title">${skill.category}</span>
                ${skill.items}
            </div>
        `).join("")}
    </div>

    <div class="section">
        <div class="section-title">PROJECTS</div>

        ${projects.map(project => `
            <div class="project">
                <div class="project-title">${project.title}</div>
                <div>${project.description}</div>
            </div>
        `).join("")}
    </div>

    <div class="section">
        <div class="section-title">EDUCATION</div>

        <div class="education-title">
            ${education.degree}
        </div>

        <div>
            ${education.institute}
        </div>

        <div class="date">
            ${education.duration}
        </div>
    </div>

    <div class="section">
        <div class="section-title">EXPERIENCE</div>

        ${experience.map(exp => `
            <div class="experience-title">
                ${exp.role} — ${exp.company}
            </div>

            <div class="date">
                ${exp.duration}
            </div>

            <div>
                ${exp.description}
            </div>
        `).join("")}
    </div>

    <div class="section">
        <div class="section-title">ADDITIONAL</div>

        <ul>
            ${additional.map(item => `<li>${item}</li>`).join("")}
        </ul>
    </div>

</body>
</html>
`;

module.exports = resumeTemplate;