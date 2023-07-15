import Link from "next/link"

async function fetchBlogs() {
  const res = await fetch('http://localhost:3000/api/blog', {
    cache: "no-cache",
  })
  const data = await res.json()
  return data.posts
}

export default async function Home() {
  const posts = await fetchBlogs()
  // console.log(posts) 
  return (
    <main className="w-full h-full">
      <div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-5 rounded-lg bg-slate-800 shadow-xl">
        <h1 className="text-slate-200 text-center text-2xl font-extrabold font-[verdana]">
         Basic PrismaDB-CRUD
        </h1>
      </div>
      <div className="w-full flex">
        <Link href="/blog/add" className="md:w-1/6 sm:w-2/4 text-center rounded-md p-2 m-auto bg-slate-800 font-semibold text-slate-200">
          Add New Post 🚀
        </Link>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        {
          posts?.map((post: any) => (
            <div key={post.id} className="w-3/4 p-4 rounded-md mx-3 my-4 bg-slate-900 flex flex-col ">
              <div className="flex items-center my-3 ">
                <div className="mr-auto">
                  <h2 className="mr-auto text-slate-200 font-semibold">
                    {post.title}
                  </h2>
                </div>
                <div className="">
              <Link href={`/blog/edit/${post.id}`} className="px-4 py-1 text-center text-lg bg-slate-800 rounded-md font-semibold text-slate-200">
              Edit
              </Link>
                </div>
              </div>
              <div className="mr-auto my-1 ">
              <blockquote className="font-bold text-slate-400">{new Date(post.date).toDateString()}</blockquote>
              </div>
              <div className="mr-auto my-1 text-slate-200">
                <h2>{post.description}</h2>
              </div>
            </div>
          ))
        }
      </div>
    </main>
  )
}
