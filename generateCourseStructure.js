const fs = require('fs');
const path = require('path');

const coursesDir = path.join(__dirname, 'src', 'contents', 'courses');
const outputfilePath = path.join(__dirname, 'src', 'contents', 'course_structure.tsx');

// Function to generate the import path
const generateImportPath = (relativePath) => {
  return `@/${relativePath.replace(/\\/g, '/')}`;
};

// Function to analyze lessons in a directory
const analyzeLessons = (lessonDir, lessonId) => {
  const pages = [];
  const files = fs.readdirSync(lessonDir);

  let pageId = 1;

  files.forEach(file => {
    const filePath = path.join(lessonDir, file);
    const stat = fs.statSync(filePath);

    if (stat.isFile() && path.extname(file) === '.tsx') {
      const importPath = generateImportPath(path.relative(__dirname, filePath));
      const pageName = path.basename(file, '.tsx').replace(/_/g, ' ');

      pages.push({
        id: pageId++,
        name: pageName.replace(/^[0-9]+[ _]/, ''),
        path: path.relative('src/contents', filePath).replace(/\.[^.]+$/, '').replace(/\\/g, '/'),
        component: "Lesson" + path.basename(file, '.tsx')
      });
    }
  });

  return pages;
};

// Function to analyze chapters in a course directory
const analyzeChapters = (chapterDir, chapterId) => {
  const lessons = [];
  const directories = fs.readdirSync(chapterDir);

  directories.forEach((lessonDirName, lessonIndex) => {
    const lessonDir = path.join(chapterDir, lessonDirName);
    const stat = fs.statSync(lessonDir);

    if (stat.isDirectory()) {
      const pages = analyzeLessons(lessonDir, lessonIndex + 1);
      lessons.push({
        id: lessonIndex + 1,
        name: lessonDirName.replace(/^[0-9]+[ _]/, '').replace(/_/g, ' '),
        pages: pages
      });
    }
  });

  return lessons;
};

// Function to analyze courses in the main directory
const analyzeCourses = (coursesDir) => {
  const courses = [];
  const directories = fs.readdirSync(coursesDir);

  directories.forEach((courseDirName, courseIndex) => {
    const courseDir = path.join(coursesDir, courseDirName);
    const stat = fs.statSync(courseDir);

    if (stat.isDirectory()) {
      const chapters = [];
      const chapterDirectories = fs.readdirSync(courseDir);

      chapterDirectories.forEach((chapterDirName, chapterIndex) => {
        const chapterDir = path.join(courseDir, chapterDirName);
        const chapterStat = fs.statSync(chapterDir);

        if (chapterStat.isDirectory()) {
          const lessons = analyzeChapters(chapterDir, chapterIndex + 1);
          chapters.push({
            id: chapterIndex + 1,
            name: chapterDirName.replace(/^[0-9]+[ _]/, '').replace(/_/g, ' '),
            lessons: lessons
          });
        }
      });

      courses.push({
        id: courseIndex + 1,
        name: courseDirName.replace(/^[0-9]+[ _]/, '').replace(/_/g, ' '),
        chapters: chapters
      });
    }
  });

  return courses;
};

// Function to generate the .tsx file
const generateTSXFile = (courses, imports) => {
  let importStatements = '';
  imports.forEach(importPath => {
    importStatements += `import ${importPath.component} from "${importPath.path}";\n`;
  });

  const content = `${importStatements}

export const courseStructure = ${JSON.stringify({ courses }, null, 2)};
`;

  const updatedJsonContent = content.replace(/\"component\": \"(\w+)\"/g, '"component": $1');

  fs.writeFileSync(outputfilePath, updatedJsonContent, 'utf8');
  console.log(`${outputfilePath}/courseStructure-generated.tsx has been generated.`);
};

// Main function
const main = () => {
  const courses = analyzeCourses(coursesDir);

  // Gather all import paths
  const imports = [];
  courses.forEach(course => {
    course.chapters.forEach(chapter => {
      chapter.lessons.forEach(lesson => {
        lesson.pages.forEach(page => {
          imports.push({
            component: page.component,
            path: generateImportPath(path.join('contents', page.path))
          });
        });
      });
    });
  });

  generateTSXFile(courses, imports);
};

main();
