// ❗‼️Since Gemini (free plan service) dont give respone quick & tokens litmit is major problem I recommend you to use Mistral AI services Only


/**-------------------Gemini_ai Service :----------------------------------*/

/**
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema")
const  puppeteer = require("puppeteer")

const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const intervieReportSchema = z.object({

    match_Score: z.number().describe("A score between 1-100 how much a candidate's profile matches to Job-Description."),


    technicalQuestions: z.array(z.object({
        question: z.string().describe("The Technical Question can be asked in Intervieww"),
        intention: z.string().describe("The intention behind asking thid question in interview."),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take ,The expected answer according to that intention of asked question in short ")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behaviouralQuestion: z.array(z.object({
        question: z.string().describe("The Technical Question can be asked in Intervieww"),
        intention: z.string().describe("The intention behind asking thid question in interview."),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take ,The expected answer according to that intention of asked question in short ")
    })).describe("Behavioural questions that can be asked in the interview along with their intention and how to answer them"),
    skill_Gap: z.array(z.object({
        skill: z.string().describe("The Skills which candidate is lacking"),
        serverity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        task: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("the tittle of job for which Interview report is generated"),

})

async function generateInterviewRreport({ resume, selfDescription, jobDescription }) {

    const prompt = `
    Generate an interview report based on the following information.
    Resume:${resume}
    Self Description:${selfDescription}
    Job Description:${jobDescription}

    Requirements:
    - match_Score must be a number between 0 and 100.
    - Generate at least 5 technicalQuestions.
    - Each technical question must contain:
        question
        intention
        answer
    - Generate at least 3 behaviouralQuestion.
    - Each behavioural question must contain:
     question
     intension
     answer
    - Generate at least 1 skill_Gap if there is any considering the specified describtion Job .
    - Each skill gap must contain:
      skill
        serverity
        - serverity must be exactly one of:
         low
         medium
        high
    - Generate at least 3 preparationPlan entries.
    - Each preparationPlan entry must contain:
        day
        focus
        task
        - day must be a NUMBER.
            Example: 1, 2, 3
        NOT "Day 1", "Day 2"
    - task must be an array of STRINGS.
            Example:
            ["Learn REST APIs", "Practice CRUD"]

    - Do NOT return objects inside task.
    - Use the exact field names from the schema.
    - Do NOT create an interview_report wrapper.
    - Do NOT add extra fields.
    Return only the JSON object.
`;
    const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(intervieReportSchema),
        }
    })
    return JSON.parse(response.text);
}
    
async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({
        format: "A4", margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        }
    })
    await browser.close()
    return pdfBuffer
}

async function generateReportPdf({ resume, selfDescription, jobDescription }) {
    const PdfSchema = z.object({
        resumehtml: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })

    const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                    `
    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(PdfSchema),
        } 
    })
    const jsonContent = JSON.parse(response.text)
    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)   
    
    return pdfBuffer
}



module.exports = generateInterviewRreport;
*/


/**-------------------Mistral_ai Service :----------------------------------*/

// /** 
const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");
const puppeteer = require("puppeteer")


const intervieReportSchema = z.object({

    match_Score: z.number().describe("A score between 1-100 how much a candidate's profile matches to Job-Description."),


    technicalQuestions: z.array(z.object({
        question: z.string().describe("The Technical Question can be asked in Intervieww"),
        intention: z.string().describe("The intention behind asking thid question in interview."),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take ,The expected answer according to that intention of asked question in short ")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behaviouralQuestion: z.array(z.object({
        question: z.string().describe("The Technical Question can be asked in Intervieww"),
        intention: z.string().describe("The intention behind asking thid question in interview."),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take ,The expected answer according to that intention of asked question in short ")
    })).describe("Behavioural questions that can be asked in the interview along with their intention and how to answer them"),
    skill_Gap: z.array(z.object({
        skill: z.string().describe("The Skills which candidate is lacking"),
        serverity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        task: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("the tittle of job for which Interview report is generated"),
})


async function generateInterviewRreport({ resume, selfDescription, jobDescription }) {

    const { Mistral } = await import("@mistralai/mistralai");

    const mistral = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });

    const prompt = `
    Generate an interview report based on the following information.
    Resume:${resume}
    Self Description:${selfDescription}
    Job Description:${jobDescription}

    Requirements:
    - match_Score must be a number between 0 and 100.
    - Generate at least 5 technicalQuestions.
    - Each technical question must contain:
        question
        intention
        answer
    - Generate at least 3 behaviouralQuestion.
    - Each behavioural question must contain:
     question
     intension
     answer
    - Generate at least 1 skill_Gap if there is any considering the specified describtion Job .
    - Each skill gap must contain:
      skill
        serverity
        - serverity must be exactly one of:
         low
         medium
        high
    - Generate at least 3 preparationPlan entries.
    - Each preparationPlan entry must contain:
        day
        focus
        task
        - day must be a NUMBER.
            Example: 1, 2, 3
        NOT "Day 1", "Day 2"
    - task must be an array of STRINGS.
            Example:
            ["Learn REST APIs", "Practice CRUD"]

    - Do NOT return objects inside task.
    - Use the exact field names from the schema.
    - Do NOT create an interview_report wrapper.
    - Do NOT add extra fields.
    Return only the JSON object.
`;

    const response = await mistral.chat.complete({
        model: "ministral-3b-2512",
        messages: [
            {
                role: "user",
                content: prompt
            }
        ],
        responseFormat: {
            type: "json_schema",
            jsonSchema: {
                name: "interview_report",
                schemaDefinition:
                    zodToJsonSchema(intervieReportSchema),
                strict: true
            }
        }

    });


    const result = JSON.parse(
        response.choices[0].message.content
    );

    result.skill_Gap = (result.skill_Gap || []).map(skill => ({
        skill: skill.skill,
        serverity: skill.serverity || skill.severity
    }));


    result.preparationPlan = (result.preparationPlan || []).map(plan => ({
        day: Number(
            String(plan.day).replace("Day ", "")
        ),

        focus: plan.focus,

        task: (plan.task || []).map(task => {

            // If AI returns:
            // { task: "something" }
            // convert it to:
            // "something"

            if (typeof task === "object") {
                return task.task;
            }

            return task;
        })
    }));

    return result;
}


async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    }
    );
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });
    await page.emulateMediaType("print");


    const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        preferCSSPageSize: true,
        margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        }
    });

    await browser.close();
    return pdfBuffer;
}


async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const PdfSchema = z.object({
        html: z.string(),
        title: z.string(),
        atsScore: z.number().min(0).max(100)
    });
    const prompt1 = `Generate resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                    `


    // ----------------------------------------------------------------------------------------------------
    /**This is for Mistral Response  */

    const prompt = `

                You are an elite technical recruiter, senior resume writer, and professional resume designer reviewing candidates for highly competitive Software Engineering and Computer Science roles at top technology companies.

                Your task is to transform the provided candidate information into a highly professional, ATS-friendly, strictly ONE-PAGE A4 resume.

                Think like a recruiter who reviews hundreds of resumes.

                The goal is NOT to make the resume sound fancy.

                The goal is to make the candidate's strongest technical abilities, relevant experience, projects, and skills immediately understandable within a 10-second recruiter scan.

                The final resume must look like it was created by an experienced technical recruiter — not by an AI resume generator.

                # ==================================================

                INPUTS

                # ==================================================

                RESUME:
                ${resume}

                SELF DESCRIPTION:
                ${selfDescription}

                JOB DESCRIPTION:
                ${jobDescription}

                ==================================================

                1. ABSOLUTE TRUTHFULNESS
                ==================================================

                Use ONLY information contained in the provided RESUME, SELF DESCRIPTION, and JOB DESCRIPTION.

                NEVER invent or assume:

                * companies
                * internships
                * job titles
                * technologies
                * projects
                * responsibilities
                * achievements
                * certifications
                * dates
                * education
                * metrics
                * performance improvements
                * users
                * revenue
                * rankings
                * GitHub repositories
                * LinkedIn profiles
                * portfolio URLs
                * deployment platforms
                * numerical results

                If a metric is not explicitly provided, DO NOT create one.

                If a technology appears in the job description but is not supported by the candidate's information, DO NOT claim that the candidate knows it.

                You may improve grammar, wording, structure, and presentation, but never change the underlying facts.

                # ==================================================

                2. RECRUITER STANDARD
                ==================================================

                Evaluate the supplied information like a high-bar technical recruiter.

                The resume should communicate:

                WHO the candidate is
                WHAT they can build
                WHAT technologies they actually use
                WHAT technical problems they have worked on
                WHICH projects demonstrate their ability
                HOW their background relates to the target role

                Prioritize technical evidence over generic personality statements.

                Avoid meaningless phrases such as:

                "hardworking"
                "passionate"
                "highly motivated"
                "quick learner"
                "team player"
                "dedicated individual"
                "seeking a challenging opportunity"

                unless the supplied information provides meaningful evidence for such claims.

                # ==================================================

                3. JOB DESCRIPTION MATCHING
                ==================================================

                Analyze the JOB DESCRIPTION internally.

                Identify relevant:

                * programming languages
                * frameworks
                * libraries
                * databases
                * development tools
                * software engineering concepts
                * responsibilities
                * technical keywords
                * domain requirements

                Then prioritize matching information from the candidate's actual background.

                Use relevant terminology naturally when supported by the candidate's information.

                DO NOT keyword-stuff.

                DO NOT falsely add experience just because a technology appears in the job description.
                

                # ==================================================

                4. ONE-PAGE A4 — ABSOLUTE REQUIREMENT
                ==================================================

                The final resume MUST fit on exactly ONE A4 page.

                Never create a second page.

                Never allow content to overflow onto another page.

                Never clip or hide content.

                Never use extremely tiny text to force content onto one page.

                If the content is too long:

                1. Remove weak information.
                2. Remove generic statements.
                3. Remove redundant skills.
                4. Shorten descriptions.
                5. Combine repetitive bullets.
                6. Reduce unnecessary spacing.
                7. Keep the strongest and most relevant information.

                Do NOT remove important technical information merely to make the page shorter.

                Target approximately 450–650 words for a student/fresher resume when possible.

                # ==================================================

                5. INFORMATION HIERARCHY
                ==================================================

                Use this order:

                1. HEADER
                2. PROFESSIONAL SUMMARY
                3. TECHNICAL SKILLS
                4. EXPERIENCE
                5. PROJECTS
                6. EDUCATION
                7. CERTIFICATIONS / ACHIEVEMENTS

                For students or candidates with limited professional experience, PROJECTS should receive strong emphasis.

                Do not create an empty section.

                If a section contains no meaningful information, omit it.

                # ==================================================

                6. HEADER
                ==================================================

                Create a compact professional header.

                Include only information actually provided.

                Preferred structure:

                CANDIDATE NAME
                Target Role

                Location | Email | Phone | GitHub | LinkedIn

                The candidate's name should be the strongest visual element.

                Do NOT use:

                * profile photo
                * emojis
                * decorative icons
                * graphical elements
                * skill bars
                * ratings
                * badges

                # ==================================================

                7. PROFESSIONAL SUMMARY
                ==================================================

                Write a concise 2–4 line professional summary.

                It should communicate:

                * candidate's current level
                * strongest technical areas
                * type of development experience
                * relevant target role

                Make it specific to the candidate.

                Do not write a generic career objective.

                Do not repeat the entire skills section.

                Do not use exaggerated claims.

                # ==================================================

                8. TECHNICAL SKILLS
                ==================================================

                Organize skills into logical categories.

                For example:

                Languages:
                C++, JavaScript, Python

                Frontend:
                React, HTML, CSS, Bootstrap

                Backend:
                Node.js, Express.js, REST APIs

                Database:
                MongoDB

                Tools:
                Git, GitHub, VS Code

                Concepts:
                REST APIs, CRUD, Authentication, Responsive Design

                Only include technologies and concepts supported by the supplied information.

                Do not repeat the same technology unnecessarily.

                # ==================================================

                9. EXPERIENCE
                ==================================================

                For each experience:

                JOB TITLE
                Company | Date

                Use concise, technically meaningful bullets.

                Prefer this structure:

                ACTION + TECHNICAL WORK + TECHNOLOGY + PURPOSE/RESULT

                Example:

                Built REST APIs using Node.js and Express.js to support CRUD operations for a full-stack application.

                Avoid weak statements such as:

                "Worked on various tasks."

                "Learned different technologies."

                "Improved my technical knowledge."

                # ==================================================

                10. PROJECTS
                    ==================================================

                Projects are extremely important for student and fresher candidates.

                Prioritize projects demonstrating:

                * full-stack development
                * backend development
                * frontend development
                * REST APIs
                * databases
                * authentication
                * machine learning
                * algorithms
                * software engineering
                * meaningful technical complexity

                For every important project use:

                PROJECT NAME
                Technologies

                • Strong technical bullet
                • Strong implementation bullet
                • Strong functionality/result bullet

                Do not write long paragraphs.

                Focus on what was actually built and how it was implemented.

                # ==================================================

                11. BULLET POINT QUALITY
                    ==================================================

                Strong bullets should answer one or more of:

                WHAT was built?
                HOW was it built?
                WHICH technologies were used?
                WHAT technical problem was solved?
                WHAT functionality was implemented?
                WHAT result was achieved?

                Use action verbs naturally:

                Built
                Developed
                Implemented
                Designed
                Integrated
                Engineered
                Created
                Optimized
                Automated
                Configured
                Deployed

                Do not force action verbs when they make the sentence unnatural.

                Never fabricate results.

                # ==================================================

                12. EDUCATION
                    ==================================================

                Keep education compact.

                Include:

                Degree
                Institution
                Graduation year

                Include GPA/percentage only if explicitly supplied and relevant.

                Do not allow education to consume unnecessary page space.

                # ==================================================

                13. CERTIFICATIONS AND ACHIEVEMENTS
                    ==================================================

                Include only meaningful achievements explicitly present in the supplied information.

                Prioritize:

                * technical certifications
                * hackathons
                * programming achievements
                * significant awards
                * relevant academic achievements

                Never invent an achievement.

                # ==================================================

                14. TYPOGRAPHY
                    ==================================================

                Use the provided reference resume ONLY as a visual reference for typography, hierarchy, spacing, and professional presentation.

                DO NOT copy any content from the reference resume.

                The candidate's supplied RESUME, SELF DESCRIPTION, and JOB DESCRIPTION are the ONLY sources for resume content.

                Use a professional ATS-safe font.

                Preferred font stack:

                Arial, Helvetica, sans-serif

                Recommended sizes:

                Candidate name:
                20–24px
                Bold

                Target role:
                10–12px
                Bold or semi-bold

                Contact information:
                8.5–9.5px

                Section headings:
                10–11px
                Bold
                Uppercase

                Body:
                9–10px

                Dates / secondary information:
                8.5–9.5px

                The resume must remain comfortably readable when printed as A4 PDF.

                Do not use excessively large fonts.

                Do not make the body text extremely small.

                Maintain consistent typography throughout the document.

                # ==================================================

                15. BOLDING
                    ==================================================

                Use bold strategically to improve recruiter scanning.

                Bold:

                * candidate name
                * target role when appropriate
                * section headings
                * job titles
                * company names
                * project names
                * degree names
                * important technologies
                * important technical terms
                * meaningful results when explicitly provided

                Do NOT bold:

                * entire paragraphs
                * entire bullet points
                * every keyword
                * every sentence

                Use bold formatting to create clear visual scanning points.

                Do not overuse bold.

                # ==================================================

                16. LAYOUT
                    ==================================================

                Use the provided reference PDF STRICTLY as a visual layout reference.

                IMPORTANT:

                The reference PDF controls ONLY:

                * page composition
                * element positioning
                * spacing
                * alignment
                * section arrangement
                * typography hierarchy
                * visual density
                * divider usage
                * header structure
                * overall resume proportions

                The reference PDF MUST NOT control or provide any resume content.

                NEVER copy from the reference PDF:

                * candidate name
                * contact information
                * job title
                * summary
                * companies
                * job descriptions
                * skills
                * education
                * certifications
                * awards
                * dates
                * projects
                * sentences
                * phrases
                * example text

                All actual resume content MUST come exclusively from the supplied RESUME, SELF DESCRIPTION, and JOB DESCRIPTION.

                ---

                ## REFERENCE LAYOUT STYLE

                Recreate the visual character of the reference PDF as closely as practical while keeping the candidate's own content.

                Use a clean, minimalist, professional BLACK-AND-WHITE resume design.

                The page should feel like a carefully typeset professional resume rather than a modern web dashboard or AI-generated template.

                ---

                ## HEADER LAYOUT

                Place the candidate's name prominently near the top of the page.

                The name should be visually dominant.

                Place contact information in a compact line near the name/header area.

                Place the candidate's target role clearly beneath or near the name.

                Keep the header compact and clean.

                Do not waste large vertical space in the header.

                Maintain strong whitespace around the header so it feels intentional and professional.

                ---

                ## MAIN PAGE COMPOSITION

                Use a structured SINGLE-PAGE A4 composition.

                Keep the overall layout compact and information-dense while remaining readable.

                Use clear horizontal alignment throughout the page.

                Sections should be visually separated without using large boxes or cards.

                Use thin, subtle horizontal divider lines where appropriate to create the same structured appearance as the reference PDF.

                The dividers should be:

                * thin
                * subtle
                * black or dark gray
                * consistent
                * used for structure rather than decoration

                ---

                ## SECTION ORGANIZATION

                Maintain the existing resume information hierarchy:

                PROFESSIONAL SUMMARY

                TECHNICAL SKILLS

                EXPERIENCE

                PROJECTS

                EDUCATION

                CERTIFICATIONS / ACHIEVEMENTS

                However, visually organize these sections in the same compact editorial style as the reference PDF.

                Section headings should be clearly identifiable.

                Use uppercase section headings where appropriate.

                Keep headings compact rather than oversized.

                Use consistent spacing before and after each section.

                ---

                ## CONTENT DENSITY

                The reference PDF uses the page efficiently.

                Follow a similar principle:

                * compact sections
                * limited unnecessary whitespace
                * short information blocks
                * concise bullets
                * clear alignment
                * controlled line spacing
                * efficient use of the full A4 page

                Do NOT artificially increase spacing simply to make the resume look larger.

                Do NOT overcrowd the page either.

                The final result should have a balanced visual density similar to the reference.

                ---

                ## INFORMATION ALIGNMENT

                Use clean alignment between:

                * section headings
                * job/project titles
                * companies
                * dates
                * descriptions
                * skill categories
                * education information

                Dates and secondary information may be visually separated from primary information using alignment and typography.

                Do not use decorative positioning.

                Use normal HTML/CSS document flow.

                ---

                ## SKILLS / COMPACT INFORMATION AREAS

                Technical skills should be presented in a compact, clean manner.

                Use category labels such as:

                Languages
                Frontend
                Backend
                Database
                Tools
                Concepts

                Keep the categories visually aligned and easy to scan.

                Do not use:

                * progress bars
                * percentage ratings
                * graphical skill meters
                * stars
                * charts
                * badges
                * colorful skill cards

                ---

                ## EXPERIENCE AND PROJECTS

                Keep experience and project entries visually compact.

                Use:

                JOB TITLE / PROJECT NAME
                Company / Technologies / Date

                followed by concise bullets.

                Create clear visual distinction between:

                * title
                * organization
                * technology
                * date
                * description

                Do not turn entries into large cards.

                Do not surround entries with boxes.

                Do not use colored backgrounds.

                ---

                ## VISUAL HIERARCHY

                The visual hierarchy should primarily come from:

                1. font size
                2. bolding
                3. whitespace
                4. alignment
                5. uppercase section headings
                6. subtle divider lines

                Do NOT rely on:

                * colors
                * icons
                * graphics
                * illustrations
                * cards
                * decorative shapes

                The candidate's name should be the strongest element.

                Section headings should be the next major visual anchors.

                Job titles and project names should then stand out from their descriptions.

                Body text should remain visually subordinate but highly readable.

                ---

                ## COLOR

                Use an extremely restrained palette.

                Preferred:

                * black
                * dark gray
                * white

                Do not introduce bright colors.

                Do not use gradients.

                Do not use colored backgrounds.

                Do not use colorful section headings.

                Do not use colored cards.

                The reference's minimalist black-and-white appearance should be preserved.

                ---

                ## REFERENCE FIDELITY

                Match the reference PDF's overall visual language as closely as possible:

                * minimalist
                * editorial
                * clean
                * structured
                * black-and-white
                * compact
                * typography-focused
                * professional
                * print-oriented

                Do NOT attempt to reproduce the reference PDF's content.

                Do NOT reproduce its exact text.

                Do NOT reproduce its candidate information.

                Do NOT use its content as sample data.

                Only reproduce the DESIGN LANGUAGE and LAYOUT PRINCIPLES.

                ---

                ## CRITICAL CONTENT SEPARATION

                There are TWO completely separate sources:

                SOURCE 1:
                Candidate RESUME + SELF DESCRIPTION + JOB DESCRIPTION

                This controls:

                * all text
                * all facts
                * all skills
                * all experience
                * all projects
                * all education
                * all dates
                * all contact information

                SOURCE 2:
                Reference PDF

                This controls ONLY:

                * layout
                * spacing
                * alignment
                * visual hierarchy
                * typography hierarchy
                * divider style
                * page composition
                * visual density
                * minimalist visual style

                NEVER transfer information from SOURCE 2 into the candidate resume.

                The candidate's actual information MUST always take priority over the reference layout.

                If the candidate's content structure differs from the reference PDF, adapt the layout while preserving the reference's minimalist visual character.

                The final result should look like the candidate's own professionally designed resume using the reference PDF's design language — NOT like a copy of the reference resume.

                # ==================================================

                17. A4 PAGE CONFIGURATION
                    ==================================================

                The HTML will be converted to PDF using Puppeteer.

                Use:

                @page {
                size: A4;
                margin: 0;
                }

                Use approximately 15–20mm page padding.

                The content must remain safely inside the printable area.

                Do NOT use fixed page heights.

                Do NOT use absolute positioning for the main resume layout.

                Do NOT allow horizontal overflow.

                # ==================================================

                18. SPACING
                    ==================================================

                Maintain a compact but professional layout.

                Recommended:

                Major section spacing:
                8–12px

                Heading-to-content spacing:
                4–6px

                Entry spacing:
                6–10px

                Bullet spacing:
                1–3px

                Line height:
                1.25–1.4

                Avoid excessive empty space.

                Avoid cramped content.

                The page should feel balanced from top to bottom.

                # ==================================================

                19. SECTION HEADINGS
                    ==================================================

                Use professional section headings such as:

                PROFESSIONAL SUMMARY
                TECHNICAL SKILLS
                EXPERIENCE
                PROJECTS
                EDUCATION
                CERTIFICATIONS
                ACHIEVEMENTS

                Make section headings visually distinct using:

                * bold typography
                * uppercase text
                * subtle spacing
                * optional thin border-bottom
                * consistent hierarchy

                Do NOT use colorful boxes or decorative section designs.

                # ==================================================

                20. VISUAL STYLE
                    ==================================================

                The provided reference resume is ONLY a visual/design reference.

                DO NOT copy any names, companies, skills, projects, education, dates, contact information, or other content from it.

                The final resume must look:

                Minimal
                Professional
                Modern
                Technical
                Clean
                Typography-focused
                Recruiter-friendly
                Print-friendly

                Use primarily black/dark text on a white background.

                If an accent color is used, it must be extremely subtle.

                Do NOT use:

                * gradients
                * bright colors
                * colorful cards
                * illustrations
                * profile photos
                * decorative graphics
                * excessive icons
                * heavy borders
                * large graphical elements

                The design should emphasize typography, spacing, alignment, hierarchy, readability, and information density.

                # ==================================================

                21. ATS COMPATIBILITY
                    ==================================================

                The resume must remain highly ATS-friendly.

                Use semantic HTML.

                Avoid:

                * SVG
                * canvas
                * images
                * icons
                * external fonts
                * external CSS
                * external resources
                * JavaScript
                * complex positioning
                * graphical text

                All CSS must be contained inside the HTML document.

                The resume must remain understandable when converted to plain text.

                # ==================================================

                22. PUPPETEER / PRINT REQUIREMENTS
                    ==================================================

                The HTML must be completely self-contained.

                Do NOT depend on:

                * external CSS
                * external JavaScript
                * CDNs
                * Google Fonts
                * images
                * APIs
                * remote assets

                Use:

                page-break-inside: avoid;
                break-inside: avoid;

                where appropriate.

                Do not use animations or interactive elements.

                The final HTML must render correctly when passed directly to:

                page.setContent(htmlContent)

                and converted using Puppeteer.

                # ==================================================

                23. VISUAL BALANCE
                    ==================================================

                After creating the resume, internally inspect the page composition.

                The page should:

                * use the available page area effectively
                * not have a huge empty bottom area
                * not feel overcrowded
                * have consistent spacing
                * maintain clear section separation
                * keep the strongest information visually prominent
                * remain readable

                Do not add useless content simply to fill empty space.

                # ==================================================

                24. FINAL 10-SECOND RECRUITER TEST
                    ==================================================

                Before returning the result, internally check:

                1. Can the candidate's role be understood immediately?
                2. Is the candidate's strongest technical stack obvious?
                3. Can the strongest projects be found quickly?
                4. Does the resume naturally match the job description?
                5. Are the bullets technically meaningful?
                6. Is there unnecessary filler?
                7. Does the resume look professionally designed?
                8. Is the typography consistent?
                9. Is the bolding useful rather than excessive?
                10. Is the layout balanced?
                11. Is everything readable?
                12. Does everything fit on ONE A4 page?
                13. Did I invent anything?
                14. Did I accidentally use content from the reference resume?

                If any answer is NO, revise the HTML internally before returning it.

                # ==================================================

                25. MOST IMPORTANT PRINCIPLE
                    ==================================================

                Do NOT try to impress the recruiter using complicated vocabulary.

                Make the resume impressive through:

                TECHNICAL CLARITY
                RELEVANCE
                SPECIFICITY
                STRONG INFORMATION HIERARCHY
                REAL PROJECT EVIDENCE
                CLEAN DESIGN
                READABILITY
                CONCISENESS

                A recruiter should be able to quickly understand:

                "What has this candidate actually built?"
                "What technologies do they actually know?"
                "How technically relevant are they to this role?"

                The supplied candidate information controls ALL resume content.

                The reference resume controls ONLY visual inspiration.

                Never mix these two purposes.

                # ==================================================

                26. OUTPUT FORMAT — CRITICAL
                    ==================================================

                The final response MUST be exactly ONE JSON object.

                The JSON object MUST contain exactly ONE top-level property named:

                "html"

                The required structure is:

                {
                "html": "COMPLETE STANDALONE HTML DOCUMENT"
                }

                CRITICAL:

                * "html" MUST be a top-level property.
                * The value of "html" MUST be a string.
                * The value MUST contain the complete standalone HTML resume document.
                * The HTML must start with a complete HTML document structure such as <!DOCTYPE html> and <html>.
                * The HTML must include all required CSS inside the document.
                * Do NOT return HTML outside the JSON object.
                * Do NOT return Markdown.
                * Do NOT use code fences.
                * Do NOT return explanations.
                * Do NOT return commentary.
                * Do NOT return additional properties.
                * Do NOT wrap the object inside another property.
                * Do NOT use a wrapper such as "Resume_Pdf".
                * Do NOT use wrappers such as "data", "result", "response", "output", or "document".
                * Do NOT return an array.
                * Do NOT return multiple JSON objects.
                * Do NOT return the schema itself.
                * Do NOT return the candidate information separately.
                * Do NOT return a summary separately.

                The response must conceptually be:

                {
                "html": "<!DOCTYPE html>...complete resume HTML...</html>"
                }

                The ONLY top-level key is "html".

                Do not leave "html" empty.

                Do not return null for "html".

                Do not return an object as the value of "html".

                Do not return an array as the value of "html".

                The complete resume must be contained inside the "html" string.

                FINAL REQUIREMENT:

                Generate the complete one-page A4 resume and return it ONLY through the top-level "html" property in the required JSON structure.

    `;

    // /**  
    const { Mistral } = await import("@mistralai/mistralai");
    const mistral = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });


    const response = await mistral.chat.complete({
        model: "ministral-8b-2512",//   ministral-3b-2512  ,   ministral-8b-2512   ,  ministral-14b-2512  ,
        messages: [
            {
                role: "user",
                content: prompt
            }
        ],
        responseFormat: {
            type: "json_schema",
            jsonSchema: {
                name: "Resume_Pdf",
                schemaDefinition: zodToJsonSchema(PdfSchema),
                strict: true
            }
        }
    });

    const content = response.choices?.[0]?.message?.content;
    if (content) {
        // console.log("Resume-Pdf Generated Successfully.")
    }
    if (!content) {
        // console.log("Mistral response:", response);
        throw new Error("Mistral did not return any content");
    }
    const jsonContent = JSON.parse(content);
    if (!jsonContent.html) {
        throw new Error("Mistral response does not contain html");
    }

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html);
    return pdfBuffer;
    // */

    //------------------------------------------------------------------------------------------------------
    /**This is for Gemini Response  */

    /** 
    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt1,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(PdfSchema),
        }
    })
    const jsonContent = JSON.parse(response.text);
    if (!jsonContent.html) {
        throw new Error("Gemini response does not contain html");
    }

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html);
    return pdfBuffer;
    */

}

async function generateResumeMetadata({ resume, jobDescription }) {
    const MetadataSchema = z.object({
        title: z.string(),
        atsScore: z.number().int().min(0).max(100)
    });

    const metadataPrompt = `
                                You are an ATS resume evaluator and technical recruiter.

                                Analyze the candidate's original resume against the provided job description.

                                RESUME:
                                ${resume}

                                JOB DESCRIPTION:
                                ${jobDescription}

                                Generate the following metadata:

                                1. title
                                Choose the most appropriate professional job title based primarily on the JOB DESCRIPTION.
                                Keep it concise and relevant to the target role.

                                2. atsScore
                                Predict the ATS compatibility score from 0 to 100.

                                Consider:
                                - Required technical skills
                                - Programming languages
                                - Frameworks and libraries
                                - Databases
                                - Tools
                                - Job responsibilities
                                - Technical keywords
                                - Relevant projects
                                - Relevant experience
                                - Overall relevance between the resume and job description

                                Important:
                                - Compare the candidate's actual resume against the job description.
                                - Do not give points simply because a technology appears in the job description.
                                - If the candidate does not demonstrate a required skill, treat it as a missing match.
                                - Do not invent skills, experience, projects, or achievements.
                                - atsScore must be an integer from 0 to 100.
                                - This is a predicted ATS compatibility score, not a guarantee of getting an interview.

                                Return only the requested structured metadata.
        `;

    const { Mistral } = await import("@mistralai/mistralai");
    const mistral = new Mistral({
        apiKey: process.env.MISTRAL_API_KEY
    });

    const response = await mistral.chat.complete({
        model: "ministral-3b-2512",
        messages: [
            {
                role: "user",
                content: metadataPrompt
            }
        ],
        responseFormat: {
            type: "json_schema",
            jsonSchema: {
                name: "Resume_Metadata",
                schemaDefinition: zodToJsonSchema(MetadataSchema),
                strict: true
            }
        }
    });

    const content = response.choices?.[0]?.message?.content;
    if (!content) {
        throw new Error("Mistral did not return resume metadata");
    }
    const metadata = JSON.parse(content);
    return metadata;
}

module.exports = { generateInterviewRreport, generateResumePdf, generateResumeMetadata };
// */

