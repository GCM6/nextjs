import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostMetaData = {
    meta: {
        title: string;
        date: string;
        background?: string;
        slug: string;
    }
    content: string;
}

const postsDirectory = path.join(process.cwd(), "src/posts");


export async function getSortedPostsData() {
    const fileDirs = fs.readdirSync(postsDirectory, { withFileTypes: true });



    //get all posts data
    const allPostsData: PostMetaData[] = fileDirs.flatMap((dir) => {
        const fileNames = fs.readdirSync(path.join(postsDirectory, dir.name));

        return fileNames.map((fileName) => {
            const fullPath = path.join(postsDirectory, dir.name, fileName);
            const fileContents = fs.readFileSync(fullPath, { encoding: 'utf8' });
            const { data, content } = matter(fileContents);

            const slug = fileName.replace(/\.mdx?$/, '');
            return {
                meta: {
                    slug,
                    id: slug,
                    title: data.title,
                    date: data.date,
                    background: data.background,
                },
                content,
            };
        });
    });

    //   // sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.meta.date < b.meta.date) {
            return 1;
        } else {
            return -1;
        }
    });
}



export function getPostBySlug(slug: string) {
    const fullPath = path.join(postsDirectory, slug, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, { encoding: 'utf8' });

    return fileContents;
}