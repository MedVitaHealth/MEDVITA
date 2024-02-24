import React,{useState} from "react";
import {useContext} from "react";
import {useEffect} from "react";
import "./dashboard.css"
import { useHttpClient } from "../../../shared/components/hooks/http-hook";
import { AuthContext } from '../../../shared/context/auth-context';
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
const Blog2 = () => {
  const [blog, setBlog] = useState([]);
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const responseData = await sendRequest(
          `https://medvita-community-api.onrender.com/api/blogs-tips-yogas/get-blogs`,
          'GET',
          null,
          {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`
          }
        );
        setBlog(responseData.blogs.Blogs);
        // console.log(responseData);
      } 
      catch (err) {
        console.log(err);
      }
    };
    fetchBlog();
  }
  , []);
  const randomBlogs = [...blog].sort(() => 0.5 - Math.random()).slice(0, 6);
    return(
      
        <div className="bg-white bg-opacity-10 py-24 sm:py-10">
          {isLoading && <LoadingSpinner asOverlay text="Fetching Your Dashboard..."/>}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Trending blogs</h2>
        </div> */}
        <div className=" mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-8 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {randomBlogs.map((post) => (
            <article key={post.id} className="blog relative overflow-hidden rounded-lg shadow transition hover:shadow-lg">
            <img
              alt="Office"
              src={`https://medvita-community-api.onrender.com${post.image}`}
              className="absolute inset-0 h-full w-full object-cover"
            />
          
            <div className="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 pt-32 sm:pt-48 lg:pt-64">
              <div className="p-4 sm:p-6">
                <time dateTime={post.date} className="block text-xs text-white/90"> {post.date} </time>
          
                <a href={post.link}>
                  <h1 className="mt-0.5 text-3xl text-white">{post.title}</h1>
                </a>
          
                <p className="mt-2 line-clamp-3 text-sm/relaxed text-white/95">
                  {post.description}
                </p>
              </div>
            </div>
          </article>
          ))}
        </div>
      </div>
    </div>
    )
}
export default Blog2;