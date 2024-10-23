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
    const allPostsData: PostMetaData[] = fileDirs.map((dir) => {
        const id = dir.name;
        const fullPath = path.join(postsDirectory, dir.name, `${dir.name}.mdx`);


        const fileContents = fs.readFileSync(fullPath, { encoding: 'utf8' });
        const matterResult = matter(fileContents);

        //  combine data with id
        return {
            meta: {
                id,
                slug: id,
                title: matterResult.data.title,
                date: matterResult.data.date,
                background: matterResult.data?.background,
            },
            content: fileContents,
        } 
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